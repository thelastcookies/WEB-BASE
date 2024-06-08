<script setup lang="ts">
import type {Rule} from "ant-design-vue/es/form";

const formState = reactive({
    name: '',
    region: undefined,
    date1: undefined,
    delivery: false,
    type: [],
    resource: '',
    desc: '',
});

const rules: Record<string, Rule[]> = {
    name: [
        {required: true, message: '请输入视图名称', trigger: 'change'},
    ],
}
</script>

<template>
    <a-form
        w-full
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{span: 8}"
        :wrapper-col="{span: 8}"
    >
        <a-form-item ref="name" label="视图名称" name="name">
            <a-input v-model:value="formState.name"/>
        </a-form-item>
        <a-form-item ref="name" label="视图中文名称" name="name">
            <a-input v-model:value="formState.desc"/>
        </a-form-item>
        <a-form-item ref="name" label="主模型选择" name="name">
            <a-input v-model:value="formState.desc"/>
        </a-form-item>
    </a-form>
</template>

<style scoped lang="less">

</style>
