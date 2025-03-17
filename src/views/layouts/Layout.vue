<script setup lang="ts">
import type { TreeNode } from '@/utils/tree';
import type { ActionRecordRaw } from '@/types/action';

const { deviceType } = useAppStore();

// Menu 初始化，来源自 actionTree
const { actionTree } = storeToRefs(useActionStore());
const menuStore = useMenuStore();
const { actionToMenu } = menuStore;
const { menu } = storeToRefs(menuStore);

const { layoutMode } = useThemeStore();

watch(actionTree, (tree: TreeNode<ActionRecordRaw>[]) => {
  menu.value = actionToMenu(tree);
}, {
  immediate: true,
});

</script>
<template>
  <a-layout w-full h-full>
    <a-layout-header
      class="!h-12" :class="[deviceType === 'desktop'? '!px-6': '!px-4']">
      <Header :menu="menu" :layoutMode="layoutMode" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="deviceType === 'desktop' && layoutMode.includes('MENU') && menu.length"
        width="220" breakpoint="xl" collapsed-width="50">
        <SidebarMenu :menu="menu"></SidebarMenu>
      </a-layout-sider>
      <a-layout>
        <PageHeader v-if="deviceType === 'desktop' && layoutMode.includes('PAGE_HEADER')"></PageHeader>
        <a-layout-content overflow-x-hidden overflow-y-auto>
          <RouterView v-slot="{ Component, route }">
            <Transition appear name="slide-fade" mode="out-in">
              <KeepAlive>
                <component :is="Component" :key="route.fullPath" />
              </KeepAlive>
            </Transition>
          </RouterView>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer v-if="deviceType === 'mobile'" class="!p-0">
      <FooterMenu :menu="menu"></FooterMenu>
    </a-layout-footer>
  </a-layout>
</template>
