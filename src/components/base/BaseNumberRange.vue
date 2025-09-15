<script setup lang="ts">
import { Form } from 'ant-design-vue';

const props = withDefaults(defineProps<{
  value: (number | undefined)[];
}>(), {
  value: () => [undefined, undefined],
});

const emit = defineEmits<{
  (e: 'update:value', params: (number | undefined)[]): void
}>();

const attrs = useAttrs();

const value1 = ref<number | undefined>(undefined);
const value2 = ref<number | undefined>(undefined);

watch(() => props.value, () => {
  value1.value = props.value[0];
  value2.value = props.value[1];
}, {
  immediate: true,
});

const context = Form.useInjectFormItemContext();

const handleChange = () => {
  emit('update:value', [value1.value, value2.value]);
  context.onFieldChange();
};

const handleBlur = () => {
  context.onFieldBlur();
};

</script>

<template>
  <div class="flex">
    <a-input-number v-bind="attrs" v-model:value="value1" @blur="handleBlur" @change="handleChange" />
    <span class="mx-1 lh-8">~</span>
    <a-input-number v-bind="attrs" v-model:value="value2" @blur="handleBlur" @change="handleChange" />
  </div>
</template>
