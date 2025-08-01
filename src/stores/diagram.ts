import type { DiagramDataWithPosition } from '@/types/diagram';

export const useDiagramStore = defineStore('diagram', () => {
  const imageMap = ref<Map<string, ImageBitmap>>(new Map());
  const selections = ref<DiagramDataWithPosition[]>([]);

  return {
    imageMap,
    selections,
  };
});
