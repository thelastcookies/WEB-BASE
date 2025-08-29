<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import type { Diagram as DiagramType } from '@/views/diagram/scripts';

const route = useRoute();
const href = computed(() => route.query?.d as string);

const dmContainer = ref<HTMLElement>();
const dmCanvas = ref<HTMLCanvasElement>();
const slCanvas = ref<HTMLCanvasElement>();

const diagram = ref<DiagramType>();
// const loading = ref(true);

const nodeTagArr = ref<string[]>([]);

// 测点详情
const detailOpen = ref(false);
const detailTags = ref<string[]>([]);

// 历史回放相关
const timeSliderOpen = ref(false);
const hisTimeRange = ref<[Dayjs, Dayjs]>([dayjs().subtract(2, 'h'), dayjs()]);
const timeSliderValue = ref(0);
const timeSliderData = ref<Map<string, number>[]>();

const preprocessHref = (href: string) => {
  return import.meta.env.APP_DIAGRAM_RESOURCE_URL + (href.startsWith('/') ? '/diagrams' + href : '/diagrams/' + href);
};

// 加载组态文件
const load = async () => {
  try {
    const res = await fetch(preprocessHref(href.value));
    const json = await res.json();

    diagram.value = new Diagram(json);
    nodeTagArr.value = diagram.value.getTags();

    // 请求实时数据并定时
    resume();
  } catch (_) {
    if (!href.value) {
      message.error(`未指定加载文件`);
    } else {
      message.error(`加载文件失败: ${href.value}`);
    }
  }
};

tryOnMounted(() => {
  load();
});

// 实时数据请求定时器
const { pause, resume } = useIntervalFn(() => {
  if (nodeTagArr.value.length) getRealTimeData(nodeTagArr.value);
}, 5000, {
  immediateCallback: true,
});

/**
 * getRealTimeData 获取实时数据
 * @param tags
 */
const getRealTimeData = async (tags: string[]) => {
  const tvMap = await getRtData(tags);
  // console.log(tvMap);
  diagram.value!.setTagValue(tvMap);
};

/**
 * getHistoricalData 获取页面内所有测点的历史数据，用于历史回放
 */
const getHistoricalData = async () => {
  const data: Map<string, Map<string, number>> = await getTrendData({
    tags: nodeTagArr.value.join('|'),
    st: dayjs(hisTimeRange.value[0]),
    ed: dayjs(hisTimeRange.value[1]),
    type: HisDataType.TIME,
  });

  if (data) {
    timeSliderData.value = [...data].map(it => it[1]);
    diagram.value!.setTagValue(timeSliderData.value[0]);
  }
};

watch(timeSliderValue, idx => {
  if (timeSliderData.value) {
    diagram.value!.setTagValue(timeSliderData.value[idx]);
  }
});

const resize = useDebounceFn(() => {
  diagram.value?.fit();
}, 200);

useResizeObserver(dmContainer, () => {
  resize();
});

tryOnUnmounted(() => {
  pause();
  diagram.value?.dispose();
});

/**
 * 模态框
 */
const modalOpen = ref(false);
const tagsList = ref<string[]>();

const { selections } = storeToRefs(useDiagramStore());

const showTrendModal = () => {
  tagsList.value = diagram.value?.getTags(selections.value);
  modalOpen.value = true;
};

const handleMouseDown = async (e: MouseEvent) => {
  const graph = await diagram.value!.setSelection(e);
  const href = graph.a?.['button.link'];
  if (!href) return;
  await routeTo({
    name: 'DIAGRAM',
    query: {
      d: href,
    },
  });
};

const handleContextClick = (key: number) => {
  if (key === 0) {
    // 开启历史回放
    hisTimeRange.value = [dayjs().subtract(2, 'hours'), dayjs()];
    timeSliderOpen.value = true;
    pause();
    getHistoricalData();
  } else if (key === 1) {
    // 停止历史回放
    timeSliderOpen.value = false;
    resume();
  } else if (key === 10) {
    detailOpen.value = true;
  } else if (key === 11) {
    showTrendModal();
  }
};

</script>

<template>
  <div class="w-full h-full relative of-hidden bg-gray">
    <DiagramContextMenu @menu-click="handleContextClick">
      <div ref="dmContainer"
        class="w-full relative"
        :class="[timeSliderOpen ? 'h-[calc(100%-78px)]' : 'h-full']"
      >
        <canvas ref="slCanvas" id="sl-canvas" class="canvas z-10"
          @mousedown="handleMouseDown"></canvas>
        <canvas ref="dmCanvas" id="dm-canvas" class="canvas z-5"></canvas>
      </div>
    </DiagramContextMenu>
    <DiagramTimeSlider v-if="timeSliderOpen" v-model:value="timeSliderValue"
      v-model:time-range="hisTimeRange" @query="getHistoricalData"></DiagramTimeSlider>
    <DiagramDetail v-model:open="detailOpen" :tags="detailTags"></DiagramDetail>
    <DiagramTrendModal
      v-model:open="modalOpen"
      :tags="tagsList"
    ></DiagramTrendModal>
  </div>
</template>

<style scoped lang="less">
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  transition: all 0.1s;
}
</style>
