<script setup lang="ts">
const open = defineModel('open', { default: false });

const props = withDefaults(defineProps<{
  coords: { x: number; y: number };
}>(), {
  coords: () => ({ x: 0, y: 0 }),
});

const domRef = ref<HTMLDivElement>();

const visible = ref(false);

const loading = ref(false);

const style = ref({
  top: '0px',
  left: '0px',
});

const tagList = ref<{
  tag: string;
  desc: string;
  value?: number,
  time: string;
}[]>([{
  tag: '',
  desc: '',
  value: undefined,
  time: '',
}]);

const { selections } = storeToRefs(useDiagramStore());

const fetch = async () => {
  const tags = selections.value.map(s => s.a?.['node.tag']!);
  const tvMap = await getRtData(tags);
  tagList.value = tagList.value.map(t => {
    return {
      ...t,
      value: tvMap?.get(t.tag)!,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
  });
};

const { resume, pause } = useTimedRefresh(fetch);

watch(open, async (v) => {
  if (!v) {
    visible.value = false;
    tagList.value = [{
      tag: '',
      desc: '',
      value: undefined,
      time: '',
    }];
    pause();
    return;
  }

  // 定位
  let x = props.coords.x;
  let y = props.coords.y;
  // await nextTick(() => {
  let top: number, left: number;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  // const domWidth = domRef.value!.clientWidth;
  // const domHeight = domRef.value!.clientHeight;
  // const parent = domRef.value!.parentNode as HTMLElement;
  const parent = document.getElementById('diagram-container');
  y -= parent!.offsetTop;
  x -= parent!.offsetLeft;
  // if (y + domHeight > viewportHeight) top = y - domHeight;
  // else top = y;
  // if (x + domWidth > viewportWidth) left = x - domWidth;
  // else left = x;
  top = y;
  left = x;

  style.value = { top: top + 'px', left: left + 'px' };
  visible.value = true;
  // });
  loading.value = true;

  const tags = selections.value.map(s => s.a?.['node.tag']!);
  const { Data: Tags } = await getPointsInfoByTag({ tags: tags.join(',') });
  if (!Tags || !Tags.length) {
    message.error('未查询到该测点详细配置');
    loading.value = false;
    return;
  }
  tagList.value = Tags.map(t => {
    return {
      tag: t.Tag,
      desc: t.Name,
      value: undefined,
      time: '',
    };
  });
  resume();
  loading.value = false;
}, {
  immediate: true,
});

onClickOutside(domRef, () => {
  open.value = false;
});

</script>

<template>
  <div v-show="visible" ref="domRef"
    class="px-3 w-350px bg-[#000D1A] c-ant.text rounded-ant.br absolute z-ant.z1"
    :style="style">
    <a-spin :spinning="loading" :delay="500">
      <div class="grid grid-cols-[45px_1fr] grid-rows-25px">
        <template v-for="(t, idx) in tagList">
          <div class="pt-2" :class="{'b-0 border-t b-solid b-ant.primary-border': idx > 0}">测点：</div>
          <div class="pt-2" :class="{'b-0 border-t b-solid b-ant.primary-border': idx > 0}">{{ t.tag ?? '-' }}</div>
          <div>描述：</div>
          <div>{{ t.desc ?? '-' }}</div>
          <div>点值：</div>
          <div>{{ t.value }}</div>
          <div class="pb-2">时间：</div>
          <div class="pb-2">{{ t.time }}</div>
        </template>
      </div>
    </a-spin>
  </div>
</template>
