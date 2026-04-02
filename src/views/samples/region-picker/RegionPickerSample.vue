<script setup lang="ts">
import RegionPicker from '@/components/region-picker/RegionPicker.vue';

const region = ref('');
</script>

<template>
  <div class="w-full p-8 flex items-center">
    <div class="w-80">
      <RegionPicker v-model:value="region" />
    </div>
    <div class="text-4 mr-2">选中值:</div>
    <div>{{ region || '未选择' }}</div>
  </div>
</template>
