import type { DiagramData, DiagramDataWithPosition, DiagramJson } from '@/types/diagram';
import type { TextStyle } from '@/types/diagram/style';

export const deserializeDiagramFile = (json: DiagramJson): Map<number, DiagramDataWithPosition> => {
  const diagramMap = new Map<number, DiagramDataWithPosition>();

  // const g = groupBy(json.d, 'c');
  // console.log(g['ht.Text']);
  // console.log(g['ht.Node']);
  // console.log(g['ht.Shape']);
  // console.log(g['ht.Edge']);

  const edges: DiagramData[] = [];

  json.d.forEach(d => {
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

  // console.log(diagramMap);

  return diagramMap;
};

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

export const getDiagramTags = (params: Map<number, DiagramDataWithPosition> | DiagramDataWithPosition[]) => {
  const tags: string[] = [];
  params.forEach(graph => {
    const g = graphMap.get(graph.p.name);
    const type = g?.type;
    if (!type) return;
    if (['text', 'switch', 'value'].includes(type)) {
      const tag = graph.a?.['node.tag'];
      if (tag) tags.push(tag);
    } else if (type === 'ctmp' || type === 'CB') {
      const tag1 = graph.a?.['node.tag.CB'] ?? graph.a?.['node.tag.cmp'];
      const tag2 = graph.a?.['node.tag.drawout'] ?? graph.a?.['node.tag.tmp'];
      if (tag1) tags.push(tag1);
      if (tag2) tags.push(tag2);
    }
  });
  return tags;
};
