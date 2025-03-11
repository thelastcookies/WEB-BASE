<script setup lang="ts">
import type { MenuTreeNode } from '@/types';

const appTitle = import.meta.env.APP_TITLE;
const { deviceType, loginEnable } = useAppStore();

defineProps<{
  menu: MenuTreeNode[],
  layoutMode: string[],
}>();

</script>

<template>
  <div class="w-full h-full flex-sb">
    <div class="h-full flex-s">
      <BaseIcon v-if="deviceType === 'desktop'"
        icon="/logo.svg" type="logo" :size="1.75"></BaseIcon>
      <span class="c-ant.white ml-3 font-size-18px font-700 tracking-wide lh-13
                  lt-sm:ml-0 lt-sm:mx-auto">{{ appTitle }}</span>
    </div>
    <HeaderMenu class="flex-1" v-if="layoutMode.includes('MENU_TOP') && menu.length" :menu="menu" />
    <div v-if="loginEnable" class="h-full lh-13">
      <UserAvatar :size="24" />
    </div>
  </div>
</template>
