<script setup lang="ts">
import type { Dayjs } from 'dayjs';

const props = defineProps<{
  href?: string;
}>();

const route = useRoute();
const href = computed(() => (props.href || route.query?.href || route.meta?.href) as string);

const dmContainer = ref<HTMLElement>();
const dmCanvas = ref<HTMLCanvasElement>();
const slCanvas = ref<HTMLCanvasElement>();

const randomId = nanoid(6);

const diagram = ref<Diagram>();
// const loading = ref(true);

const nodeTagArr = ref<string[]>([]);

// 测点详情
const detailOpen = ref(false);
const detailCoords = ref({ x: 0, y: 0 });
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

    diagram.value = new Diagram(json, randomId);
    nodeTagArr.value = diagram.value!.getTags();

    // 请求实时数据并定时
    resume();

    const cTags = diagram.value!.getControlTags();
    if (cTags && cTags.length) {
      await fetchControl(cTags);
    }
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
}, 2000, {
  immediateCallback: true,
});

/**
 * getRealTimeData 获取实时数据
 * @param tags
 */
const getRealTimeData = async (tags: string[]) => {
  const tvMap = await getRtData(tags);
  // console.log(tvMap);
  diagram.value!.setValueMap(tvMap);
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
    diagram.value!.setValueMap(timeSliderData.value[0]);
  }
};

watch(timeSliderValue, idx => {
  if (timeSliderData.value) {
    diagram.value!.setValueMap(timeSliderData.value[idx]);
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
  if (e.button === 0) {
    await diagram.value!.setSelection(e);
    const graph = selections.value[0];
    const href = graph.a?.['button.link'];
    if (href) {
      await routeTo({
        name: 'DIAGRAM',
        query: {
          d: href,
        },
      });
    } else if (graph.p.name === '操作按钮（开机）' || graph.p.name === '操作按钮（关机）') {
      // 开关机按钮
      controlModalOpen.value = true;
    }
  } else if (e.button === 2) {
    const node = diagram.value!.getNodeByPosition({ x: e.offsetX, y: e.offsetY });
    if (node && node.length) {
      await diagram.value!.setSelection(e, true);
    }
  }
};

const handleContextClick = (key: number, coords: { x: number; y: number }) => {
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
    detailCoords.value = coords;
    detailTags.value = selections.value.map(s => s.a!['node.tag']!);
  } else if (key === 11) {
    showTrendModal();
  } else if (Object.values(diagramControlContextMenu).flatMap(it => it.map(i => i.key)).includes(key)) {
    let tag = '';
    if (key === 21) {
      tag = selections.value[0].a!['node.tag.cmp']!;
    } else if (key === 22) {
      tag = selections.value[0].a!['node.tag.tmp']!;
    } else {
      return;
    }

    handleControl(diagram.value?.getControlTag(tag));
  } else {
  }
};

/**
 * 控制
 */
const { controlModalOpen, controlCrtState, controlTagInfo } = storeToRefs(useControlStore());

const fetchControl = async (tags: string[]) => {
  const { Data: cTags } = await getControlTagInfo({
    Tag: tags.join(','),
  });
  if (!cTags || !cTags.length) return;

  let cMap = new Map<string, ControlTagInfoRecordExt>([]);
  tags.forEach(tag => {
    let t = cTags.find(t => tag === t.Tag);
    if (t) {
      cMap.set(tag, {
        ...t,
        action: t.ControlType.split(',')[1],
      });
    }
  });
  diagram.value?.setControlTagMap(cMap);
};

const handleControl = (controlTag?: ControlTagInfoRecord) => {
  if (!controlTag) {
    message.error('获取测点信息失败，请检查测点配置');
    return;
  }
  controlModalOpen.value = true;
  controlTagInfo.value = controlTag;
  controlCrtState.value = String(diagram.value?.getValue(selections.value[0].a!['node.tag']!) ?? 0);
};
</script>

<template>
  <div class="w-full h-full relative of-hidden diagram-container-bg" id="diagram-container">
    <DiagramContextMenu @menu-click="handleContextClick" :diagram="diagram">
      <div ref="dmContainer" class="w-full relative"
        :class="[timeSliderOpen ? 'h-[calc(100%-78px)]' : 'h-full']"
      >
        <canvas ref="slCanvas" :id="`sl-canvas-${randomId}`" class="canvas z-10"
          @mousedown="handleMouseDown"></canvas>
        <canvas ref="dmCanvas" :id="`dm-canvas-${randomId}`" class="canvas z-5"></canvas>
      </div>
    </DiagramContextMenu>
    <DiagramTimeSlider v-if="timeSliderOpen" v-model:value="timeSliderValue"
      v-model:time-range="hisTimeRange" @query="getHistoricalData"></DiagramTimeSlider>
    <DiagramDetail v-model:open="detailOpen" :coords="detailCoords"></DiagramDetail>
    <DiagramTrendModal
      v-model:open="modalOpen"
      :tags="tagsList"
    ></DiagramTrendModal>
  </div>
</template>

<style scoped lang="less">
.diagram-container-bg {
  background-color: #000;
  background-image: url("~/icons/rect.png");
  background-size: 40px 40px;
  background-position: center;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  //transition: all 0.1s;
}
</style>
