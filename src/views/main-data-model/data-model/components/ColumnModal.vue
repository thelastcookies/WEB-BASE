<script setup lang="ts">
import type {Column} from "@/api/data/model-column/types";
import type {Rule} from "ant-design-vue/es/form";

/**
 * 模态框配置
 */
const props = withDefaults(defineProps<{
    type: number,
}>(), {
    type: EditEnum.NEW,
});

const open = defineModel('open', {default: false});
const data = defineModel('data', {default: {} as Column});

const title = computed(() => {
    return (props.type === EditEnum.NEW ? '新增' : '编辑') + '字段';
});

const handleOk = () => {
    formRef.value.validate().then(async () => {
        data.value = Object.assign({}, column.value);
        open.value = false;
        formRef.value.resetFields();
    });
};

const handleCancel = () => {
    formRef.value.resetFields();
};

/**
 * 表单配置
 */
const formRef = ref();
const rules: Record<string, Rule[]> = {
    column_name: [
        {required: true, message: '字段名称不可为空', trigger: 'blur'},
        {pattern: /^[a-zA-Z_-]+$/, message: '仅支持大小写字母、连字符或下划线', trigger: 'change'},
    ],
    column_comment: [
        {required: true, message: '字段中文名称不可为空', trigger: 'blur'},
        {max: 20, message: '长度不可超过20个字符', trigger: 'change'},
    ],
    data_type: [{required: true, message: '字段数据类型不可为空', trigger: 'blur'}],
    data_length: [{pattern: /^[0-9]+$/, message: '仅支持数字', trigger: 'change'}],
    data_precision: [{pattern: /^[0-9]+$/, message: '仅支持数字', trigger: 'change'}],
};
const labelCol = {span: 6, offset: 0};
const wrapperCol = {span: 18, offset: 0};
const column = ref({
    column_name: "",
    column_comment: "",
    data_type: "",
    data_length: "",
    data_precision: "",
    primary_key: false,
    is_unique: false,
    auto_increment: false,
} as Column);

watch(() => data, (val) => {
    column.value = Object.assign({...data.value}, val);
});
const dataTypeOptions = ["BIGINT", "BLOB", "CHAR", "DATE", "DATETIME", "DECIMAL", "DOUBLE", "ENUM", "FLOAT",
    "INT", "JSON", "TEXT", "TIMESTAMP", "TINYINT", "VARCHAR"].map(i => ({value: i}));
</script>

<template>
    <a-modal
        v-model:open="open"
        :title="title"
        :mask-closable="false"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-form
            ref="formRef"
            autocomplete="off"
            :model="column"
            :rules="rules"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            p-t-normal
        >
            <a-form-item
                label="字段名称"
                name="column_name"
                has-feedback
            >
                <a-input v-model:value="column.column_name"/>
            </a-form-item
            >
            <a-form-item
                label="字段中文名称"
                name="column_comment"
                has-feedback
            >
                <a-input v-model:value="column.column_comment"/>
            </a-form-item>
            <a-form-item
                label="数据类型"
                name="data_type"
                has-feedback
            >
                <a-select v-model:value="column.data_type" :options="dataTypeOptions">
                </a-select>
            </a-form-item>
            <a-form-item
                label="数据长度"
                name="data_length"
            >
                <a-input v-model:value="column.data_length"/>
            </a-form-item>
            <a-form-item
                label="数据精度"
                name="data_precision"
            >
                <a-input v-model:value="column.data_precision"/>
            </a-form-item>
            <a-form-item
                label="主键"
                name="model_status"
            >
                <a-radio-group v-model:value="column.primary_key">
                    <a-radio :value="true">是</a-radio>
                    <a-radio :value="false">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                label="唯一标识字段"
                name="model_status"
            >
                <a-radio-group v-model:value="column.is_unique">
                    <a-radio :value="true">是</a-radio>
                    <a-radio :value="false">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                label="自增"
                name="model_status"
            >
                <a-radio-group v-model:value="column.auto_increment">
                    <a-radio :value="true">是</a-radio>
                    <a-radio :value="false">否</a-radio>
                </a-radio-group>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
