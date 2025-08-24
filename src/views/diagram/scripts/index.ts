import type { DiagramData, DiagramDataWithPosition, DiagramJson } from '@/types/diagram';

const { selections } = storeToRefs(useDiagramStore());

const selectionIds = computed(() => selections.value.map(item => item.i));
const controlKey = useKeyModifier('Control');
const metaKey = useKeyModifier('Meta');

export class Diagram {
  dmCanvas: HTMLCanvasElement;
  slCanvas: HTMLCanvasElement;

  dmCtx: CanvasRenderingContext2D;
  slCtx: CanvasRenderingContext2D;

  dmMap: Map<number, DiagramDataWithPosition>;

  // 画布边框
  PADDING = 50;

  // 画布宽高
  width: number = 0;
  height: number = 0;

  // 画布位置
  top: number = 0;
  right: number = 0;
  bottom: number = 0;
  left: number = 0;

  scale: number = 1;

  // 动画
  lastTime: number = 0;
  animationId: number | null = null;

  // 性能检测
  frameCount: number = 0;
  lastFpsUpdate: number = 0;
  fps: number = 0;

  // 数据
  valueMap: Map<string, number> | undefined;

  constructor(json: DiagramJson) {
    this.dmCanvas = document.getElementById('dm-canvas') as HTMLCanvasElement;
    this.slCanvas = document.getElementById('sl-canvas') as HTMLCanvasElement;

    this.dmMap = this.deserialize(json);

    const { top, right, bottom, left } = this.getBoundary();

    // 设置画布尺寸
    this.width = right - left + 2 * this.PADDING;
    this.height = bottom - top + 2 * this.PADDING;

    this.dmCanvas.width = this.width;
    this.dmCanvas.height = this.height;
    this.slCanvas.width = this.width;
    this.slCanvas.height = this.height;

    this.dmCtx = this.dmCanvas.getContext('2d')!;
    this.slCtx = this.slCanvas.getContext('2d')!;

    this.dmCtx.imageSmoothingEnabled = true;
    if (this.dmCtx.imageSmoothingQuality) {
      this.dmCtx.imageSmoothingQuality = 'high';
    }

    // 画布位置修正
    this.dmCtx.translate(-left + this.PADDING, -top + this.PADDING);
    this.slCtx.translate(-left + this.PADDING, -top + this.PADDING);

    // 存储位置信息
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;

    // this.draw();
    // this.fit();
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.loop);
  }

  loop = (timestamp: DOMHighResTimeStamp) => {
    // 时间增量
    // const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // this.draw(deltaTime);
    this.draw();

    this.animationId = requestAnimationFrame(this.loop);

    this.frameCount++;
    if (timestamp - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = timestamp;
      // console.log(`FPS: ${this.fps}`);
    }
  };

  fit() {
    // 视口宽高
    const container = this.dmCanvas.parentElement!;
    const pw = container.clientWidth;
    const ph = container.clientHeight;

    let scale = 1;

    // 源图宽高比
    const aspect = this.width / this.height;
    // 画布宽高比
    const canvasAspect = pw / ph;
    if (aspect > canvasAspect) {
      // 基于宽度适配
      scale *= pw / this.width;
    } else {
      // 基于高度适配
      scale *= ph / this.height;
    }
    scale = scale > 2.5 ? 2.5 : scale;
    this.scale = scale;

    this.dmCanvas.style.scale = `${scale}`;
    this.dmCanvas.style.left = `calc(50% - ${(this.width / 2) * scale}px)`;
    this.dmCanvas.style.top = `calc(50% - ${(this.height / 2) * scale}px)`;

    this.slCanvas.style.scale = `${scale}`;
    this.slCanvas.style.left = `calc(50% - ${(this.width / 2) * scale}px)`;
    this.slCanvas.style.top = `calc(50% - ${(this.height / 2) * scale}px)`;
  };

  /**
   * 文件反序列化与初步解析
   * @param json 文件内容
   */
  deserialize = (json: DiagramJson): Map<number, DiagramDataWithPosition> => {
    const diagramMap = new Map<number, DiagramDataWithPosition>();

    const edges: DiagramData[] = [];

    json.d.sort((a, b) => {
      // 处理层级
      const al = a.p.layer ?? 0;
      const bl = b.p.layer ?? 0;
      return al - bl;
    }).forEach(d => {
      if (d.c === 'ht.Text') {
        diagramMap.set(d.i, deserializeText(d));
      } else if (d.c === 'ht.Shape') {
        diagramMap.set(d.i, d);
      } else if (d.c === 'ht.Node') {
        diagramMap.set(d.i, deserializeNode(d));
      } else if (d.c === 'ht.Edge') {
        edges.push(d);
      }
    });

    edges.forEach(d => {
      diagramMap.set(d.i, d);
    });

    return diagramMap;
  };

  getBoundary = () => {
    let top = Infinity, right = -Infinity, bottom = -Infinity, left = Infinity;
    this.dmMap.forEach(d => {
      if (d.p.position === undefined) return;
      const t = (d.y ?? d.p.position.y) - (d.h ?? d.p.height) / 2;
      const r = (d.x ?? d.p.position.x) + (d.w ?? d.p.width) / 2;
      const b = (d.y ?? d.p.position.y) + (d.h ?? d.p.height) / 2;
      const l = (d.x ?? d.p.position.x) - (d.w ?? d.p.width) / 2;
      top = t < top ? t : top;
      right = r > right ? r : right;
      bottom = b > bottom ? b : bottom;
      left = l < left ? l : left;
    });

    return { top, right, bottom, left };
  };

  getTags = (params?: DiagramDataWithPosition[]) => {
    const tags: string[] = [];
    const iter = params ?? this.dmMap;
    iter.forEach(graph => {
      const g = graphMap.get(graph.p.name);
      const type = g?.type;
      if (!type) return;
      const tag = graph.a?.['node.tag'];
      if (tag) tags.push(tag);
      if (type === 'ctmp' || type === 'CB') {
        const tag1 = graph.a?.['node.tag.CB'] ?? graph.a?.['node.tag.cmp'];
        const tag2 = graph.a?.['node.tag.drawout'] ?? graph.a?.['node.tag.tmp'];
        if (tag1) tags.push(tag1);
        if (tag2) tags.push(tag2);
      }
    });
    return tags;
  };

  setTagValue(tvMap?: Map<string, number>) {
    this.valueMap = tvMap;
  }

  /**
   * 绘制组态方法
   */
  draw = () => {
    this.dmCtx.clearRect(this.left - this.PADDING, this.top - this.PADDING, this.width, this.height);
    this.dmMap.forEach(d => {
      if (d.c === 'ht.Text') {
        drawText(this.dmCtx, d, this.valueMap);
      } else if (d.c === 'ht.Node') {
        drawNode(this.dmCtx, d, this.valueMap);
      } else if (d.c === 'ht.Shape') {
        drawShape(this.dmCtx, d);
      } else if (d.c === 'ht.Edge') {
        drawEdge(this.dmCtx, d, this.dmMap);
      }
    });
  };

  /**
   * 绘制 被选择图元外框 方法
   * @param ids 被选中图元 id 列表
   */
  drawSelection = (ids: number[]) => {
    window.requestAnimationFrame(() => {

      this.slCtx.clearRect(this.left - this.PADDING, this.top - this.PADDING, this.width, this.height);

      this.slCtx.save();
      ids.forEach((id) => {
        const d = this.dmMap.get(id)!;
        const x = d.x!;
        const y = d.y!;
        const w = d.w!;
        const h = d.h!;

        const dx = x - w / 2;
        const dy = y - h / 2;

        this.slCtx.strokeStyle = '#00FF00';
        this.slCtx.lineWidth = 2;
        this.slCtx.setLineDash([5, 5]);
        this.slCtx.strokeRect(dx - 2, dy - 2, w + 4, h + 4);
      });
      this.slCtx.restore();
    });
  };

  /**
   * 鼠标点选处理
   * @param e
   */
  setSelection = (e: MouseEvent) => {
    return new Promise<DiagramDataWithPosition>(resolve => {
      e.stopPropagation();
      let x = e.offsetX;
      let y = e.offsetY;

      // 鼠标点击位置修正
      x += Number(this.left) - this.PADDING;
      y += Number(this.top) - this.PADDING;

      const ids = controlKey.value || metaKey.value ? [...selectionIds.value] : [];
      // 检查是否点击了某个对象
      for (const [id, d] of this.dmMap) {
        const name = d.p.name;
        const graph = graphMap.get(name);
        if (!graph || ['static', 'table'].includes(graph.type)) continue;
        const dx = d.x! - d.w! / 2;
        const dy = d.y! - d.h! / 2;
        if (x >= dx &&
          x <= dx + d.w! &&
          y >= dy &&
          y <= dy + d.h!) {
          if (graph.type === 'button') {
            return resolve(d);
          }
          ids.push(id);
        }
      }
      this.drawSelection(ids);
      selections.value = ids.map(id => this.dmMap.get(id)!);
    });
  };

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
