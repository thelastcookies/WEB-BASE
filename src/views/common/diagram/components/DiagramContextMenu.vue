<script setup lang="ts">
const props = withDefaults(defineProps<{
  diagram?: Diagram;
}>(), {});
const emit = defineEmits<{
  (e: 'menuClick', key: number, coords: { x: number; y: number }): void;
}>();

const key = ref(0);
const open = ref(false);

const { selections } = storeToRefs(useDiagramStore());

const menu = ref<ContextMenuItem[]>([]);

const globalMenu = [{
  key: 0,
  value: '查看历史回放',
  disabled: () => key.value === 0,
}, {
  key: 1,
  value: '关闭历史回放',
  disabled: () => key.value === 1,
}];

const nodeMenu = [{
  key: 10,
  value: '查看测点详情',
  disabled: () => selections.value.length > 1,
}, {
  key: 11,
  value: '查看历史趋势',
  disabled: false,
}];

watch(open, v => {
  if (!v) return;
  if (selections.value.length) {
    let m: ContextMenuItem[] = [];
    if (selections.value.length === 1) {
      const cTag = selections.value[0].a?.['node.tag.cmp'];
      if (cTag) {
        const t = props.diagram?.getControlTag(cTag);
        m.push(merge({}, ...diagramControlContextMenu.cmp!, { value: t?.action }));
      }
      const tTag = selections.value[0].a?.['node.tag.tmp'];
      if (tTag) {
        const t = props.diagram?.getControlTag(tTag);
        m.push(merge({}, ...diagramControlContextMenu.tmp!, { value: t?.action }));
      }
    }
    menu.value = [...nodeMenu, ...m];
  } else {
    menu.value = globalMenu;
  }
});

const handleMenuClick = (e: MouseEvent, key: number) => {
  open.value = false;
  emit('menuClick', key, { x: e.clientX, y: e.clientY });
};

</script>

<template>
  <a-dropdown :trigger="['contextmenu']" v-model:open="open">
    <slot></slot>
    <template #overlay>
      <a-menu>
        <a-menu-item
          v-for="item in menu"
          :key="item.key"
          @click="handleMenuClick($event, item.key)"
        >{{ item.value }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
