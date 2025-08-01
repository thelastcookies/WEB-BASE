/**
 * 处理页面交互
 */
import type { DiagramDataWithPosition } from '@/types/diagram';

const { selections } = storeToRefs(useDiagramStore());

const selectionIds = computed(() => selections.value.map(item => item.i));
const controlKey = useKeyModifier('Control');
const metaKey = useKeyModifier('Meta');

export const setSelection = (e: MouseEvent, map: Map<number, DiagramDataWithPosition>) => {
  e.stopPropagation();
  const x = e.clientX;
  const y = e.clientY;

  const ids = controlKey.value || metaKey.value ? [...selectionIds.value] : [];
  // 检查是否点击了某个对象
  for (const [id, d] of map) {
    const name = d.p.name;
    const graph = graphMap.get(name);
    if (!graph || ['static', 'table'].includes(graph.type)) continue;
    const dx = d.x! - d.w! / 2;
    const dy = d.y! - d.h! / 2;
    if (x >= dx &&
      x <= dx + d.w! &&
      y >= dy &&
      y <= dy + d.h!) {
      ids.push(id);
    }
  }

  drawSelection(e.target as HTMLCanvasElement, map, ids);
  selections.value = ids.map(id => map.get(id)!);
};


export const handleContextMenu = (e: MouseEvent) => {
  e.stopPropagation();
};
