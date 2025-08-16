<script setup lang="ts">
import type { RecordName } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { RouteLocationNormalized } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

const { actionTree } = storeToRefs(useActionStore());

const breadcrumb = ref<TreeNode<ActionRecordRaw>[]>([]);
const currentRoute = ref<RouteLocationNormalized>();

// 订阅路由变化，设置面包屑
listenRouteChange((route: RouteLocationNormalized) => {
  let name: RecordName;
  if (route.redirectedFrom && route.redirectedFrom.name !== '404') {
    if (route.name === 'DIAGRAM') {
      name = route.redirectedFrom.name as RecordName;
    } else {
      name = route.name as RecordName;
    }
  } else {
    name = route.name as RecordName;
  }
  const ancestorChain = findActionAncestorChain(actionTree.value, name);
  if (!ancestorChain || !ancestorChain.length) return;
  breadcrumb.value = ancestorChain.reverse();
  currentRoute.value = route;
}, true);

onUnmounted(() => {
  removeRouteListener();
});

const routes = computed(() => {
  return breadcrumb.value.map(item => {
    return {
      path: item.url,
      breadcrumbName: item.title,
    };
  });
});

const router = useRouter();

// TODO 插槽迁移

const title = computed(() => {
  if (!currentRoute.value) return '';
  return currentRoute.value.query?.title || currentRoute.value.meta?.title as string || '';
});
const subTitle = computed(() => {
  if (!currentRoute.value) return '';
  return currentRoute.value.query?.subTitle || currentRoute.value.meta?.subTitle as string || '';
});

const backBtnEnable = computed(() => {
  if (!currentRoute.value) return false;
  if (currentRoute.value.meta?.backEnable) return null;
  else return false;
});

</script>

<template>
  <a-page-header
    class="!py-4"
    :title="title"
    :sub-title="subTitle"
    :breadcrumb="{ routes }"
    :ghost="false"
    :back-icon="backBtnEnable"
    @back="router.go(-1)"
  >
    <template #backIcon>
      <BaseIcon icon="i-mdi-arrow-left" size="1.2" />
    </template>
  </a-page-header>
</template>
