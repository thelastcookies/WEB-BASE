<script setup lang="ts">
import type {Model} from "@/api/data/model/types";
import type {Rule} from "ant-design-vue/es/form";
import {message} from "ant-design-vue";

/**
 * 模态框配置
 */
const props = withDefaults(defineProps<{
    type: number,
    data: Model,
}>(), {
    type: EditEnum.NEW,
    data: {} as Model,
});

const emit = defineEmits(['refresh']);

const open = defineModel('open', {default: false});
const confirmLoading = ref<boolean>(false);

const title = computed(() => {
    return (props.type === EditEnum.NEW ? '新增' : '编辑') + '数据模型';
});

const handleOk = () => {
    confirmLoading.value = true;
    formRef.value.validate().then(async () => {
        const loadingKey = 'loadingKey';
        message.loading({
            content: '正在提交中',
            key: loadingKey,
            duration: 0,
        });
        Object.assign(model.value, {
            model_status: model.value.model_status ? 1 : 0,
        });
        try {
            const {result} = props.type === EditEnum.NEW ? await addModel(model.value): await updModel(model.value);
            if (!result) return false;
            message.success({
                content: '提交成功',
                key: loadingKey,
            });
            open.value = false;
            emit('refresh');
        } catch (e) {
            message.error({
                content: '提交失败',
                key: loadingKey,
            });
        }
        formRef.value.resetFields();
    }).finally(() => {
        confirmLoading.value = false;
    });
};

const handleCancel = () => {
    formRef.value.resetFields();
    model.value = {
        model_id: -1,
        model_name: "",
        model_full_name: "",
        model_status: false,
        model_remark: "",
    };
};

/**
 * 表单配置
 */
const formRef = ref();
const rules: Record<string, Rule[]> = {
    model_name: [{required: true, message: '模型名称不可为空', trigger: 'blur'}],
    model_full_name: [{required: true, message: '模型中文名称不可为空', trigger: 'blur'}],
};
const labelCol = {span: 6, offset: 0};
const wrapperCol = {span: 18, offset: 0};
const model = ref({
    model_id: -1,
    model_name: "",
    model_full_name: "",
    model_status: false,
    model_remark: "",
} as Model);

watch(() => props.data, (val) => {
    model.value = Object.assign(model.value, val);
});

</script>

<template>
    <a-modal
        v-model:open="open"
        :title="title"
        :mask-closable="false"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-form
            ref="formRef"
            autocomplete="off"
            :model="model"
            :rules="rules"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            p-t-normal
        >
            <a-form-item
                label="模型名称"
                name="model_name"
            >
                <a-input v-model:value="model.model_name"/>
            </a-form-item>
            <a-form-item
                label="模型中文名称"
                name="model_full_name"
            >
                <a-input v-model:value="model.model_full_name"/>
            </a-form-item>
            <a-form-item
                label="模型状态"
                name="model_status"
            >
                <a-radio-group v-model:value="model.model_status">
                    <a-radio :value="true">启用</a-radio>
                    <a-radio :value="false">禁用</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                label="备注"
                name="model_remark"
            >
                <a-textarea v-model:value="model.model_remark"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
