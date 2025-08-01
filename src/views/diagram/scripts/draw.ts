import type { DiagramDataWithPosition, XYPoint } from '@/types/diagram';
import type { EdgeStyle, ShapeStyle, TextStyle } from '@/types/diagram/style';
import type { NodeColorAttr } from '@/types/diagram/attr';

const { imageMap } = useDiagramStore();

/**
 * 绘制组态方法
 * @param canvas
 * @param dmMap 经过预处理的图元哈希
 * @param tvMap 测点键值对
 */
export const draw = (canvas: HTMLCanvasElement, dmMap: Map<number, DiagramDataWithPosition>, tvMap?: Map<string, number>) => {
  window.requestAnimationFrame(() => {
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dmMap.forEach(d => {
      if (d.c === 'ht.Text') {
        drawText(ctx, d, tvMap);
      } else if (d.c === 'ht.Node') {
        drawNode(ctx, d, tvMap);
      } else if (d.c === 'ht.Shape') {
        drawShape(ctx, d);
      } else if (d.c === 'ht.Edge') {
        drawEdge(ctx, d, dmMap);
      }
    });
  });
};

/**
 * 绘制 被选择图元外框 方法
 * @param canvas
 * @param dmMap 经过预处理的图元哈希
 * @param ids 被选中图元 id 列表
 */
export const drawSelection = (canvas: HTMLCanvasElement, dmMap: Map<number, DiagramDataWithPosition>, ids: number[]) => {
  window.requestAnimationFrame(() => {
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ids.forEach((id) => {
      const d = dmMap.get(id)!;
      const x = d.x!;
      const y = d.y!;
      const w = d.w!;
      const h = d.h!;

      const dx = x - w / 2;
      const dy = y - h / 2;

      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(dx - 2, dy - 2, w + 4, h + 4);
    });
  });
};


/**
 * 绘制 文本图元 的一般方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
const drawText = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  ctx.save();
  const textStyle = d.s as TextStyle;

  const tag = d.a?.['node.tag'];
  let text = 'TEXT';

  const x = d.x!;
  const y = d.y!;

  const align = textStyle['text.align'] ?? 'left';
  const vAlign = textStyle['text.vAlign'] ?? 'middle';

  const name = d.p.name;
  let value = tag && tvMap && tvMap.get(tag) !== undefined ? tvMap.get(tag) ?? 1 : null;
  if (name === '文字') {
    text = value !== null ? String(value) : textStyle.text ?? 'TEXT';
    ctx.textAlign = align;
    ctx.textBaseline = vAlign;
    ctx.fillStyle = textStyle['text.color'] ?? '#000';
  } else if (name === '数据绑定') {
    const label = d.a?.['node.label'] ?? '###.#';
    const valueArr = label.split('.');
    const decLen = valueArr[1] ? valueArr[1].length : 0;
    text = value !== null ? value.toFixed(decLen) : label;
    text += d.a?.['node.unit'] ?? '';
    ctx.textAlign = 'center';
    ctx.fillStyle = (textStyle as NodeColorAttr)['node.color'] ?? '#00FF00';
  } else if (name === '告警变色') {
    text = d.a?.['node.label'] ?? '告警变色';
    const color1 = d.a?.['node.color'] ?? '#D8D8D8';
    const color2 = d.a?.['node.color2'] ?? '#FF0000';
    const reverse = d.a?.['node.type.switch.reverse'] ?? false;
    if (reverse && value) value = value ^ 1;
    ctx.textAlign = 'center';
    ctx.fillStyle = value === null ? color1 :
      value === 1 ? color1 : color2;
  } else if (name === '显示隐藏') {
    if (value === 0) return;
    text = d.a?.['node.label'] ?? '显示隐藏';
    ctx.textAlign = 'center';
    ctx.fillStyle = (textStyle as NodeColorAttr)['node.color'] ?? '#FF0000';
  }

  ctx.font = textStyle['text.font'] ?? '16px arial, sans-serif';

  const fontSize = Number(textStyle['text.font']?.match(/[0-9]*/)?.[0] ?? 16);

  if (textStyle['text.vertical']) {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      ctx.fillText(char, x, y + (i - text.length / 2 + 0.5) * fontSize);
    }
  } else {
    ctx.fillText(text, x, y);
  }
  ctx.restore();
};

/**
 * 绘制 图元 的一般方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
const drawNode = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  ctx.save();

  const graph = getNodeGraph(d, tvMap);
  if (graph) {
    const { src } = graph;
    if (imageMap.has(src)) {
      drawImage(ctx, d, imageMap.get(src)!);
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        drawImage(ctx, d, img);
        createImageBitmap(img).then((image) => {
          imageMap.set(src, image);
        });
      };
    }
  } else {
    const name = d.p.name;
    if (['数据绑定', '告警变色', '显示隐藏'].includes(name)) {
      drawText(ctx, d, tvMap);
    } else if (name === '光字牌') {
      drawAnnunciator(ctx, d, tvMap);
    } else if (name === '按钮') {
      drawButton(ctx, d);
    } else if (name === '表格') {
      drawTable(ctx, d);
    } else if (name === '进度条') {
      drawProgressBar(ctx, d, tvMap);
    }
  }

  ctx.restore();
};

/**
 * 绘制 svg 图元 的一般方法
 * @param ctx
 * @param d
 * @param img
 */
const drawImage = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, img: HTMLImageElement | ImageBitmap) => {
  const nodeAttr = d.a;

  const x = d.x!;
  const y = d.y!;
  const w = d.p.width;
  const h = d.p.height;
  const angle = d.angle!;

  const dx = x - w / 2;
  const dy = y - h / 2;

  ctx.save();
  if (angle !== 0) {
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);
  }
  if (nodeAttr?.['node.color']) {
    // 临时 canvas
    const tCanvas = document.createElement('canvas');
    tCanvas.width = w;
    tCanvas.height = h;
    const tempCtx = tCanvas.getContext('2d')!;

    // 绘制并改色
    tempCtx.drawImage(img, 0, 0, w, h);
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = nodeAttr['node.color']!;
    tempCtx.fillRect(0, 0, w, h);

    // 添加到主 canvas
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(tCanvas, dx, dy, w, h);
  } else {
    ctx.drawImage(img, dx, dy, w, h);
  }

  ctx.restore();
};

/**
 * 绘制 多边折线 的一般方法
 * @param ctx
 * @param d 图元配置
 */
const drawShape = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
  const points = d.p.points?.__a;
  if (!points || !points.length) return;

  const shapeStyle = d.s as ShapeStyle;

  ctx.save();
  ctx.strokeStyle = shapeStyle['shape.border.color'] ?? '#FF0000';
  ctx.lineWidth = shapeStyle['shape.border.width'] ?? 2;
  drawLine(ctx, points);

  if (shapeStyle['shape.dash']) {
    ctx.strokeStyle = shapeStyle['shape.dash.color'] ?? '#000';
    ctx.setLineDash(shapeStyle['shape.dash.pattern'] ?? [8, 8]);
    drawLine(ctx, points);
  }
  ctx.restore();
};

/**
 * 绘制 图元连线 的一般方法
 * @param ctx
 * @param d 图元配置
 * @param map 图元配置 Map
 */
const drawEdge = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, map: Map<number, DiagramDataWithPosition>) => {
  ctx.save();

  const edgeStyle = d.s as EdgeStyle;

  const sId = d.p.source?.__i!;
  const tId = d.p.target?.__i!;

  const source = map.get(sId)!;
  const target = map.get(tId)!;

  const sx = source.x! - source.w! / 2;
  const sy = source.y! - source.h! / 2;
  const tx = target.x! - target.w! / 2;
  const ty = target.y! - target.h! / 2;

  // Node 边缘范围裁切
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.rect(sx, sy, source.w!, source.h!);
  ctx.rect(tx, ty, target.w!, target.h!);
  ctx.clip('evenodd');

  ctx.lineWidth = edgeStyle['edge.width'] ?? 2;
  ctx.strokeStyle = edgeStyle['body.color'] ?? '#FF0000';

  if (edgeStyle['edge.type'] === 'points') {
    // 直线
    drawLine(ctx, [source as XYPoint, target as XYPoint]);

    if (edgeStyle['edge.dash']) {
      ctx.strokeStyle = edgeStyle['edge.dash.color'] ?? '#000';
      ctx.setLineDash(edgeStyle['edge.dash.pattern'] ?? [8, 8]);
      drawLine(ctx, [source as XYPoint, target as XYPoint]);
    }
  } else if (edgeStyle['edge.type'] === 'h.v') {
    // 折线
    const bending = { x: target.x!, y: source.y! };
    drawLine(ctx, [source as XYPoint, bending, target as XYPoint]);

    if (edgeStyle['edge.dash']) {
      ctx.strokeStyle = edgeStyle['edge.dash.color'] ?? '#000';
      ctx.setLineDash(edgeStyle['edge.dash.pattern'] ?? [8, 8]);
      drawLine(ctx, [source as XYPoint, bending, target as XYPoint]);
    }
  }

  ctx.restore();
};

/**
 * 绘制 line 的一般方法
 * @param ctx
 * @param points 坐标点数组
 */
const drawLine = (ctx: CanvasRenderingContext2D, points: XYPoint[]) => {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    ctx.moveTo(points[i].x, points[i].y);
    if (i + 1 < points.length) {
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
    }
  }
  ctx.stroke();
  ctx.restore();
};

/**
 * 原生属性 label 绘制方法
 * @param ctx
 * @param d 图元配置
 */
const fillLabel = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
  let x = d.x!;
  let y = d.y!;
  const w = d.p.width;
  const h = d.p.height;

  ctx.save();
  const text = d.s?.['label'] ?? d.p.name ?? 'TEXT';
  ctx.textAlign = 'center';
  ctx.font = d.s['label.font'] ?? '16px arial, sans-serif';

  const pos = d.s['label.position'] ?? 17;
  if (pos === 17) {
    // 中
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  } else if (pos === 11) {
    // 上
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
  } else if (pos === 23) {
    // 下
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
  } else if (pos === 16) {
    // 左
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    x = x - w / 2 + 2;
  } else if (pos === 18) {
    // 右
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    x = x + w / 2 - 2;
  } else if (pos === 3) {
    // 外部上
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    y = y - h;
  } else if (pos === 31) {
    // 外部下
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    y = y + h;
  } else if (pos === 14) {
    // 外部左
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    x = x - w / 2 - 2;
  } else if (pos === 20) {
    // 外部右
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    x = x + w / 2 + 2;
  }
  ctx.fillStyle = d.s['label.color'] ?? '#000';

  ctx.fillText(text, x, y);
  ctx.restore();
};

// 特殊图元绘制
/**
 * 图元 光字牌 绘制方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
const drawAnnunciator = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  const x = d.x!;
  const y = d.y!;
  const w = d.p.width;
  const h = d.p.height;

  const dx = x - w / 2;
  const dy = y - h / 2;

  ctx.save();
  const tag = d.a?.['node.tag'];
  let value = tag && tvMap && tvMap.get(tag) !== undefined ? tvMap.get(tag) ?? 1 : null;
  const color1 = d.a?.['node.background.color'] ?? '#00FF00';
  const color2 = d.a?.['node.background.color2'] ?? '#FF0000';
  const reverse = d.a?.['node.type.switch.reverse'] ?? false;
  if (reverse && value) value = value ^ 1;

  ctx.fillStyle = value === null ? color1 :
    value === 1 ? color1 : color2;

  ctx.fillRect(dx, dy, w, h);
  ctx.restore();

  fillLabel(ctx, d);
};

/**
 * 图元 按钮 绘制方法
 * @param ctx
 * @param d 图元配置
 */
const drawButton = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
  const x = d.x!;
  const y = d.y!;
  const w = d.p.width;
  const h = d.p.height;

  const dx = x - w / 2;
  const dy = y - h / 2;

  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#FFF';
  ctx.strokeRect(dx, dy, w, h);

  ctx.fillStyle = d.a?.['node.background.color'] ?? 'rgb(2, 27, 53)';
  ctx.fillRect(dx + 2, dy + 2, w - 4, h - 4);
  ctx.restore();

  fillLabel(ctx, d);
};

/**
 * 图元 表格 绘制方法
 * @param ctx
 * @param d 图元配置
 */
const drawTable = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
  const x = d.x!;
  const y = d.y!;
  const w = d.p.width;
  const h = d.p.height;

  const dx = x - w / 2;
  const dy = y - h / 2;

  const dataSource = d.a?.['node.table.dataSource'] ? JSON.parse(d.a?.['node.table.dataSource']) : [{}, {}, {}, {}];
  const columns = d.a?.['node.table.columns'] ? JSON.parse(d.a?.['node.table.columns']) : [{ 'key': 'column1' }, { 'key': 'column2' }, { 'key': 'column3' }, { 'key': 'column4' }];

  const hBg = d.a?.['node.table.head.background'] ?? 'rgb(240, 240, 240)';
  const bBg = d.a?.['node.table.body.background'] ?? '#FFF';

  const bw = d.a?.['node.table.border.width'] ?? 2;
  const bc = d.a?.['node.table.border.color'] ?? 'rgb(212, 212, 212)';

  const hh = d.a?.['node.table.head.height'] ?? 30;
  const bh = d.a?.['node.table.body.height'] ?? 30;

  const hMerge = d.a?.['node.table.head.merge'] ?? true;

  ctx.lineWidth = bw;
  ctx.strokeStyle = bc;

  // 最外层边框
  ctx.save();
  ctx.strokeRect(dx, dy, w, h);
  ctx.restore();

  const innerLeft = dx + bw;
  const innerRight = dx + w - bw;
  const innerTop = dy + bw;
  const innerBottom = dy + h - bw;

  // 表头
  ctx.save();
  ctx.fillStyle = hBg;
  ctx.fillRect(innerLeft, innerTop, w - 2 * bw, hh);
  ctx.beginPath();
  ctx.restore();
  const headerTop = innerTop + hh + bw;

  // 表格
  ctx.fillStyle = bBg;
  ctx.fillRect(innerLeft, headerTop, w - 2 * bw, h - bw * 3 - hh);

  // 行线
  for (let i = 0, len = dataSource.length; i < len; i++) {
    const ly = headerTop + i * (bh + bw);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(innerLeft, ly);
    ctx.lineTo(innerRight, ly);
    ctx.stroke();
    ctx.restore();
  }
  // 列线
  for (let i = 0, len = columns.length - 1; i < len; i++) {
    ctx.save();
    const cw = columns[i].width ?? 120;
    const xt = innerLeft + (cw + bw) * (i + 1);
    const yt = hMerge ? innerTop + hh + bw : innerTop;
    ctx.beginPath();
    ctx.moveTo(xt, yt);
    ctx.lineTo(xt, innerBottom);
    ctx.stroke();
    ctx.restore();
  }
};

/**
 * 图元 进度条 绘制方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
const drawProgressBar = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  const x = d.x!;
  const y = d.y!;
  const w = d.p.width;
  const h = d.p.height;

  const dx = x - w / 2;
  const dy = y - h / 2;

  const min = d.a?.['node.value.min'] ?? 0;
  const max = d.a?.['node.value.max'] ?? 100;

  const direction = d.a?.['node.direction.vertical'] ?? 'up';

  const tag = d.a?.['node.tag'];
  let value = tag && tvMap && tvMap.get(tag) !== undefined ? tvMap.get(tag) ?? 50 : 50;
  const ratio = value / (max - min);

  ctx.save();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = '#000';
  ctx.strokeRect(dx, dy, w, h);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = d.a?.['node.color'] ?? '#00FF00';
  const dh = h * (ratio > 1 ? 1 : ratio);
  if (direction === 'up') {
    ctx.fillRect(dx + 1, dy + h - dh, w - 2, dh);
  } else {
    ctx.fillRect(dx + 1, dy + 1, w - 2, dh);
  }
  ctx.restore();
};
