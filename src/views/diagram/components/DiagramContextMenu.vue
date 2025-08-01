<script setup lang="ts">
//
// const props = withDefaults(defineProps<{
//   x?: number;
//   y?: number;
//   tag?: string;
// }>(), {
//   x: 0,
//   y: 0,
// });

const emit = defineEmits<{
  (e: 'menuClick', key: number): void;
}>();

const key = ref(0);

const { selections } = storeToRefs(useDiagramStore());
const type = ref<'global' | 'node'>('global');

watch(selections, s => {
  type.value = s.length ? 'node' : 'global';
});

const globalMenu = ref([{
  key: 0,
  value: '查看历史回放',
  disabled: () => key.value === 0,
}, {
  key: 1,
  value: '关闭历史回放',
  disabled: () => key.value === 1,
}]);

const nodeMenu = ref([{
  key: 10,
  value: '查看测点详情',
  disabled: () => selections.value.length > 1,
}, {
  key: 11,
  value: '查看历史趋势',
  disabled: false,
}]);

const handleMenuClick = (key: number) => {
  emit('menuClick', key);
};

</script>

<template>
  <a-dropdown :trigger="['contextmenu']">
    <slot></slot>
    <template #overlay>
      <a-menu>
        <a-menu-item
          v-for="item in (type === 'global' ? globalMenu : nodeMenu)"
          :key="item.key"
          @click="handleMenuClick(item.key)"
        >{{ item.value }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
