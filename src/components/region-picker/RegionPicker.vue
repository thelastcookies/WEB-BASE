<script setup lang="ts">
import type { CascaderProps } from 'ant-design-vue';
import type { RegionOption, RegionValue } from './types';
import regionDataRaw from './region-data.json';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';

const value = defineModel<RegionValue>('value', {
  default: '',
});

const cascaderValue = ref<string[]>([]);

const regionData = regionDataRaw as { provinces: RegionOption[] };

const options = computed<CascaderProps['options']>(() => {
  return regionData.provinces.map((province) => ({
    label: province.label,
    value: province.value,
    children: province.children?.map((city) => ({
      label: city.label,
      value: city.value,
    })),
  }));
});

const parseValue = (val: RegionValue): string[] => {
  if (!val) return [];
  const parts = val.split('-');
  return parts.filter(Boolean);
};

const formatValue = (vals: string[]): RegionValue => {
  return vals.join('-');
};

watch(
  () => value.value,
  (newVal) => {
    cascaderValue.value = parseValue(newVal);
  },
  { immediate: true }
);

const handleChange: CascaderProps['onChange'] = (selectedValue) => {
  const val = selectedValue as string[];
  cascaderValue.value = val;
  value.value = formatValue(val);
};
</script>

<template>
  <a-cascader
    v-model:value="cascaderValue"
    :options="options"
    placeholder="请选择省市"
    :show-search="{ filter: (inputValue: string, path: DefaultOptionType[]) => path.some(option => option.label!.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) }"
    change-on-select
    @change="handleChange"
  />
</template>
