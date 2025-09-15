<script setup lang="ts">
import type { LocationAsRelativeRaw, RouteLocationNormalized, RouteQueryAndHash, RouteRecordName } from 'vue-router';
import type { Key } from '@/types';

// TODO: 允许与不允许多开

export interface Tab {
  name?: RouteRecordName;
  title: string;
  path: string;
  closable: boolean;
}

const routes = useRouter().getRoutes();
const homepageId = import.meta.env.APP_HOMEPAGE_ID;
const homepagePath = routes.find(r => r.name === homepageId)?.path!;

const activePath = ref<string>(homepagePath);
const tabs = ref<Tab[]>([]);

const initTab = () => {
  const homeRoute = routes.find(r => r.name === homepageId)!;

  let path = homeRoute.path;
  if (homeRoute.redirect && (homeRoute.redirect as LocationAsRelativeRaw)['name'] === 'DIAGRAM') {
    path = routes.find(r => r.name === 'DIAGRAM')!.path + '?d=' + (homeRoute.redirect as RouteQueryAndHash).query!.d;
  }
  const homeTab = {
    name: homeRoute.name,
    title: homeRoute.meta?.title as string,
    path,
    closable: false,
  };
  activePath.value = path!;
  tabs.value.push(homeTab);
};

initTab();

const updateTab = (tab: Tab) => {
  activePath.value = tab.path!;
  const exist = tabs.value.some(r => r.path === tab.path);
  if (!exist) {
    tabs.value.push(tab);
  }
};

const handleRemoveTab = (e: Key | MouseEvent | KeyboardEvent) => {
  const path = e as Key;

  // 如果被关闭的是当前页面，则跳转到临近的标签页
  if (activePath.value === path) {
    const crtTabIndex = tabs.value.findIndex(t => t.path === path);
    let nextTab = tabs.value[crtTabIndex + 1] || tabs.value[crtTabIndex - 1];
    if (nextTab) {
      activePath.value = nextTab.name as string;
    } else {
      // 如果关闭后没有其他标签页，则打开 Home 标签页
      activePath.value = homepagePath;
      nextTab = tabs.value.find(r => r.path === homepagePath)!;
    }
    routeTo({ name: nextTab.name!, path: nextTab.path });
  }
  tabs.value = tabs.value.filter(t => t.path !== path);
};

const handleTabClick = (path: Key) => {
  routeTo(path as string);
};

// 订阅路由变化，设置标签页
listenRouteChange((route: RouteLocationNormalized) => {
  let title: string;
  if (route.name === 'DIAGRAM') {
    const href = (route.query?.d as string).split(/[./]/);
    title = href[href.length - 2];
  } else {
    title = route.meta?.title as string;
  }
  updateTab({
    name: route.name!,
    title,
    path: route.fullPath,
    closable: true,
  });
}, true);


// const name = computed(() => {
//   const a = href.value.split(/[./]/);
//   return a[a.length - 2];
// });

</script>

<template>
  <a-tabs v-model:activeKey="activePath"
    type="editable-card" hide-add size="middle"
    class="px-2 pt-2"
    @change="handleTabClick"
    @edit="handleRemoveTab"
  >
    <a-tab-pane v-for="t in tabs" :key="t.path" :tab="t.title" :closable="t.closable"></a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="less">
:deep(.ant-tabs-nav) {
  margin: 0;
}
</style>
