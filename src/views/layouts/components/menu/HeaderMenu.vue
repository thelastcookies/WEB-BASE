<script setup lang="ts">
import type { MenuTreeNode, RecordName } from '@/types';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import type { RouteLocationNormalized } from 'vue-router';

defineProps<{
  menu: MenuTreeNode[],
}>();

const selectedKeys = ref([] as string[]);

const handleMenuClick = ({ key }: MenuInfo) => {
  routeTo({ name: key as string });
};

const { actionTree } = storeToRefs(useActionStore());

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;

  const indexMenuSelectable = ancestorChain.findIndex(action => action.showInMenu === true);
  if (indexMenuSelectable < 0) return;
  selectedKeys.value = [String(ancestorChain[indexMenuSelectable].actionId)];
}, true);

onUnmounted(() => {
  removeRouteListener();
});
</script>

<template>
  <a-menu class="top-menu"
    h-full px-6
    v-model:selectedKeys="selectedKeys"
    mode="horizontal"
    @click="handleMenuClick"
  >
    <template v-for="item in menu" :key="item.key">
      <SubMenu :item="item" />
    </template>
  </a-menu>
</template>
