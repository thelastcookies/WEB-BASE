const { imageMap } = useDiagramStore();

/**
 * 解析文件中文本的位置、对齐信息
 * @param d
 */
export const deserializeText = (d: DiagramData): DiagramDataWithPosition => {
  const textStyle = d.s as TextStyle;

  let x = d.p.position.x ?? 0;
  let y = d.p.position.y ?? 0;

  const w = d.p.width ?? 100;
  const h = d.p.height ?? 50;

  const align = textStyle['text.align'] ?? 'left';
  const vAlign = textStyle['text.vAlign'] ?? 'middle';

  // 位置修正
  if (align === 'left' || align === 'right') {
    x = align === 'left' ? x - w / 2 + 2 : x + w / 2 - 2;
  }

  if (vAlign == 'top' || vAlign === 'bottom') {
    y = vAlign === 'top' ? y - h / 2 + 4 : y + h / 2 - 2;
  } else {
    y += 1;
  }

  return {
    x, y, w, h, ...d,
  };
};

/**
 * 解析文件中图元的大小、位置、旋转信息
 * @param d
 */
export const deserializeNode = (d: DiagramData): DiagramDataWithPosition => {
  let x = d.p.position.x ?? 0;
  let y = d.p.position.y ?? 0;

  const w = d.p.width;
  const h = d.p.height;

  const rotation = d.p.rotation ? round(d.p.rotation, 4) : 0;
  let angle = d.p.rotation !== 0 ?
    rotation === round(1 / 2 * Math.PI, 4) ? (1 / 2 * Math.PI) :
      rotation === round(Math.PI, 4) ? Math.PI :
        rotation === round(3 / 2 * Math.PI, 4) ? (3 / 2 * Math.PI) : 0 : 0;

  if (angle !== 0 && (angle === 1 / 2 * Math.PI || angle === 3 / 2 * Math.PI)) {
    return {
      x, y, h: w, w: h, angle, ...d,
    };
  } else {
    return {
      x, y, w, h, angle, ...d,
    };
  }
};

/**
 * 绘制 文本图元 的一般方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
export const drawText = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
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
export const drawNode = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  ctx.save();

  const graph = getNodeGraph(d, tvMap);
  if ((graph as NodeGraph).src) {
    // 图片图元
    const { src } = graph as NodeGraph;
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
    // 手绘图元
    const name = graph.name;
    const type = graph.type;
    if (type === 'text') {
      drawLabel(ctx, d, tvMap);
    } else if (type === 'shape') {
      drawGeometric(ctx, d, tvMap);
    } else if (type === 'switch') {
      if (name === '光字牌') {
        drawAnnunciator(ctx, d, tvMap);
      }
    } else if (type === 'value') {
      if (name === '进度条') {
        drawProgressBar(ctx, d, tvMap);
      }
    } else if (type === 'button') {
      drawButton(ctx, d);
    } else if (type === 'table') {
      drawTable(ctx, d);
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
export const drawImage = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, img: HTMLImageElement | ImageBitmap) => {
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
export const drawShape = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
  const points = d.p.points?.__a;
  if (!points || !points.length) return;

  const shapeStyle = d.s;
  const shapeAttr = d.a as NodeShapeAttr;
  const isClosed = shapeAttr?.['node.shape.isClosed'];

  ctx.save();
  ctx.strokeStyle = shapeStyle['shape.border.color'] ?? '#FF0000';
  ctx.lineWidth = shapeStyle['shape.border.width'] ?? 2;
  const path = drawLine(ctx, points, isClosed);

  if (shapeStyle['shape.dash']) {
    ctx.strokeStyle = shapeStyle['shape.dash.color'] ?? '#000';
    ctx.setLineDash(shapeStyle['shape.dash.pattern'] ?? [8, 8]);
    drawLine(ctx, points, isClosed);
  }
  if (shapeStyle['shape.background']) {
    ctx.fillStyle = shapeStyle['shape.background'] ?? '#000';
    ctx.fill(path!);
  }
  ctx.restore();
};

/**
 * 绘制 几何图形 的一般方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
const drawGeometric = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  let points: XYPoint[] = [];
  // TODO: 完善图形绘制
  if (d.p.name === '1/4圆弧') {
  } else if (d.p.name === '1/2圆弧') {
  } else if (d.p.name === '3/4圆弧') {
  } else if (d.p.name === '圆形') {
  } else if (d.p.name === '圆角矩形') {
  } else if (d.p.name === '矩形') {
    const p = d.p.position;
    const w = d.p.width;
    const h = d.p.height;
    const dx = p.x - w / 2;
    const dy = p.y - h / 2;
    points = [
      { x: dx, y: dy },
      { x: dx + w, y: dy },
      { x: dx + w, y: dy + h },
      { x: dx, y: dy + h },
    ];
  } else if (d.p.name === '三角形') {
  } else if (d.p.name === '梯形') {
  }
  if (!points.length) return;

  const nodeAttr = d.a;

  ctx.save();

  ctx.strokeStyle = nodeAttr?.['node.border.color'] ?? '#FF0000';
  ctx.lineWidth = nodeAttr?.['node.border.width'] ?? 2;
  const path = drawLine(ctx, points, true);

  if (nodeAttr?.['node.background.color']) {
    ctx.fillStyle = nodeAttr?.['node.background.color'] ?? 'rgba(0, 0, 0, 0)';
    ctx.fill(path!);
  }
  ctx.restore();
};

/**
 * 绘制 图元连线 的一般方法
 * @param ctx
 * @param d 图元配置
 * @param map 图元配置 Map
 */
export const drawEdge = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, map: Map<number, DiagramDataWithPosition>) => {
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
 * @param isClosed 是否闭合路径
 */
export const drawLine = (ctx: CanvasRenderingContext2D, points: XYPoint[], isClosed?: boolean): Path2D | undefined => {
  if (!points.length) return;
  ctx.save();
  ctx.beginPath();
  const path = new Path2D();
  path.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length; i++) {
    if (i + 1 < points.length) {
      path.lineTo(points[i + 1].x, points[i + 1].y);
    }
  }
  if (isClosed) path.closePath();
  ctx.stroke(path);
  ctx.restore();
  return path;
};

/**
 * 原生属性 label 绘制方法
 * @param ctx
 * @param d 图元配置
 * @param tvMap 测点数据
 */
export const drawLabel = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
  let x = d.x!;
  let y = d.y!;
  const w = d.p.width;
  const h = d.p.height;

  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = d.s['label.font'] ?? '16px arial, sans-serif';

  // 位置
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

  const tag = d.a?.['node.tag'];
  const name = d.p.name;
  let text = d.s?.label ?? name ?? 'TEXT';
  let value = tag && tvMap && tvMap.get(tag) !== undefined ? tvMap.get(tag) ?? 1 : null;

  if (name === '数据绑定') {
    const labelTemp = text ?? '###.#';
    const valueArr = labelTemp.split('.');
    const decLen = valueArr[1] ? valueArr[1].length : 0;
    text = value !== null ? value.toFixed(decLen) : text;
    ctx.fillStyle = d.s?.['label.color'] ?? '#00FF00';
  } else if (name === '告警变色') {
    text = text ?? '告警变色';
    const color1 = d.s?.['label.color'] ?? '#D8D8D8';
    const color2 = d.a?.['node.color2'] ?? '#FF0000';
    const reverse = d.a?.['node.type.switch.reverse'] ?? false;
    if (reverse && value !== null) value = value ^ 1;
    ctx.fillStyle = value === null ? color1 :
      value === 1 ? color2 : color1;
  } else if (name === '显示隐藏') {
    const reverse = d.a?.['node.type.switch.reverse'] ?? false;
    if (reverse && value !== null) value = value ^ 1;
    if (value === 0) return;
    text = text ?? '显示隐藏';
    ctx.fillStyle = d.s?.['label.color'] ?? '#FF0000';
  } else {
    ctx.fillStyle = d.s['label.color'] ?? '#000';
  }

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
export const drawAnnunciator = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
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
  if (reverse && value !== null) value = value ^ 1;

  ctx.fillStyle = value === null ? color1 :
    value === 1 ? color2 : color1;

  ctx.fillRect(dx, dy, w, h);
  ctx.restore();

  drawLabel(ctx, d);
};

/**
 * 图元 按钮 绘制方法
 * @param ctx
 * @param d 图元配置
 */
export const drawButton = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
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

  drawLabel(ctx, d);
};

/**
 * 图元 表格 绘制方法
 * @param ctx
 * @param d 图元配置
 */
export const drawTable = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition) => {
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
export const drawProgressBar = (ctx: CanvasRenderingContext2D, d: DiagramDataWithPosition, tvMap?: Map<string, number>) => {
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
