<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import type { DiagramDataWithPosition } from '@/types/diagram';

const route = useRoute();
const href = computed(() => (route?.meta as any)?.href);
const name = computed(() => (route?.meta as any)?.name);

// 返回按钮
const backBtnVisible = ref(false);
const goForward = () => {
  router.go(-1);
};

const dmContainer = ref<HTMLElement>();
const dmCanvas = ref<HTMLCanvasElement>();
const dmMap = ref<Map<number, DiagramDataWithPosition>>();
const slCanvas = ref<HTMLCanvasElement>();

// const loading = ref(true);

const nodeTagArr = ref<string[]>([]);

// 测点详情
const detailOpen = ref(false);

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
    // if (window.history.state.back) backBtnVisible.value = true;
    const route = useRoute();
    const res = await fetch(preprocessHref(route.query?.d ?? href.value));
    const json = await res.json();

    dmMap.value = deserializeDiagramFile(json);

    const boundary = getDiagramBoundary(dmMap.value);
    init(boundary);
    fit();
    // draw(dmCanvas.value!, dmMap.value!);

    nodeTagArr.value = getDiagramTags(dmMap.value);

    // 请求实时数据并定时
    resume();
  } catch (_) {
    message.error('加载文件失败: ' + (name.value || route.query?.d || href.value));
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
  draw(dmCanvas.value!, dmMap.value!, tvMap);
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
    draw(dmCanvas.value!, dmMap.value!, timeSliderData.value[0]);
  }
};

watch(timeSliderValue, idx => {
  if (timeSliderData.value) {
    draw(dmCanvas.value!, dmMap.value!, timeSliderData.value[idx]);
  }
});

const resize = useDebounceFn(() => {
  fit();
}, 200);

useResizeObserver(dmContainer, () => {
  resize();
});

tryOnUnmounted(() => {
  pause();
});

/**
 * 模态框
 */
const modalOpen = ref(false);
const tagsList = ref<string[]>();

const { selections } = storeToRefs(useDiagramStore());

const showTrendModal = () => {
  tagsList.value = getDiagramTags(selections.value);
  modalOpen.value = true;
};

const handleMouseDown = (e: MouseEvent) => {
  setSelection(e, dmMap.value!);
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
    <a-button v-if="backBtnVisible"
      class="absolute top-6 left-6 px-2 z-ant.l1"
      @click="goForward"
    >
      <BaseIcon icon='i-mdi-arrow-left'></BaseIcon>
    </a-button>
    <DiagramTimeSlider v-if="timeSliderOpen" v-model:value="timeSliderValue"
      v-model:time-range="hisTimeRange"></DiagramTimeSlider>
    <DiagramDetail v-model:open="detailOpen"></DiagramDetail>
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
