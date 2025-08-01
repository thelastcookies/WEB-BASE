<script setup lang="ts">
const open = defineModel('open', { default: false });

const domRef = ref<HTMLDivElement>();

const style = ref({
  top: '0px',
  left: '0px',
});

const tagList = ref([{
  tag: '',
  desc: '',
  value: '',
  time: '',
}]);

const { selections } = storeToRefs(useDiagramStore());

watch(open, async (v) => {
  if (!v) return;
  tagList.value = [{
    tag: '',
    desc: '',
    value: '',
    time: '',
  }];
  const d = selections.value[0];
  const x = d.x!;
  const y = d.y!;
  await nextTick(() => {
    let top: number, left: number;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const domWidth = domRef.value!.clientWidth;
    const domHeight = domRef.value!.clientHeight;
    if (y + domHeight > viewportHeight) top = y - domHeight - 10;
    else top = y + 10;
    if (x + domWidth > viewportWidth) left = x - domWidth - 10;
    else left = x + 10;
    style.value = { top: top + 'px', left: left + 'px' };
  });
  const tags = getDiagramTags([d]);
  const { data, code } = await getDesc(tags.join('|'));
  if (code !== 200) return;
  if (data) {
    tagList.value = tags.map(t => {
      const d = data[(t).toLowerCase()];
      if (!d) return {
        tag: '',
        desc: '',
        value: '',
        time: '',
      };
      return {
        tag: t,
        desc: d.description,
        value: d.val,
        time: d.time,
      };
    });
  }
}, {
  immediate: true,
});

onClickOutside(domRef, () => {
  open.value = false;
});

</script>

<template>
  <div v-if="open" ref="domRef"
    class="py-2 px-3 min-w-150px bg-[#000D1A] c-ant.text rounded-ant.br absolute grid grid-cols-[45px_1fr] grid-rows-[repeat(4,25px)] z-ant.l1"
    :style="style">
    <template v-for="t in tagList">
      <div>测点：</div>
      <div>{{ t.tag ?? '-' }}</div>
      <div>描述：</div>
      <div>{{ t.desc ?? '-' }}</div>
      <div>点值：</div>
      <div>{{ t.value }}</div>
      <div>时间：</div>
      <div>{{ t.time }}</div>
    </template>
  </div>
</template>
