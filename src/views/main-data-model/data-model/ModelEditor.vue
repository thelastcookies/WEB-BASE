<script setup lang="ts">
import type {Key} from "@/types";
import {h} from "vue";
import {DeleteOutlined, FolderAddOutlined} from "@ant-design/icons-vue";
import type {Column} from "@/api/data/model-column/types";
import {Modal} from "ant-design-vue";
import type {Model} from "@/api/data/model/types";

const props = defineProps<{
    modelId: number,
}>();

const modelData = {
    model_id: 0,
    model_name: 'employee',
    model_full_name: '部门信息表',
    model_status: true,
    model_remark: '部门信息表'
} as Model;

const routeBack = () => {
    router.back();
};

/**
 * 步骤相关
 */
const currentStep = ref(0);
const successType = ref(null as null | 'save' | 'deploy');
const settingSteps = [{title: '实体表配置'}, {title: '数据校验配置'}, {title: '完成'}];
const handleToStep = (step: StepEnum, type?: 'save' | 'deploy') => {
    if (step === StepEnum.STEP3) {
        addModelColumn(props.modelId, columnTableData.value).then(res => {
            console.log(res);
        });
    } else {
        currentStep.value = step;
        successType.value = type ?? null;
    }
};

/**
 * 实体表配置表格
 */
const entityTableColumns = [{
    title: '字段名称',
    dataIndex: 'column_name',
}, {
    title: '字段中文名称',
    dataIndex: 'column_comment',
}, {
    title: '字段数据类型',
    dataIndex: 'data_type',
}, {
    title: '数据长度',
    dataIndex: 'data_length',
}, {
    title: '数据精度',
    dataIndex: 'data_precision',
}, {
    title: '主键',
    dataIndex: 'primary_key',
}, {
    title: '唯一标识字段',
    dataIndex: 'is_unique',
}, {
    title: '自增字段',
    dataIndex: 'auto_increment',
}, {
    title: '操作',
    width: 120,
    dataIndex: 'operation',
}];

const columnTableData = ref([] as Column[]);

const handleEdit = (type: number, data?: Column) => {
    modalOpened.value = true;
    modalType.value = type;
    if (type === EditEnum.EDIT && data) {
        modalData.value = data;
    }
};

const handleDelete = (modelId: number) => {

};
/**
 * 数据校验配置表格
 */
const validateTableColumns = [{
    title: '字段名称',
    dataIndex: 'name',
}, {
    title: '字段中文名称',
    dataIndex: 'desc',
}, {
    title: '必填',
    width: 80,
    dataIndex: 'required',
}, {
    title: '字典',
    dataIndex: 'dict',
}];

const validateTableData = [] as any[];

const selectedRowKeys: Key[] = [];

const routeToPageDataModel = () => {
    routeTo({name: 'dataModel'});
};
/**
 * 模态框
 */
const modalOpened = ref(false);
const modalType = ref(EditEnum.NEW);
const modalData = ref({} as Column);

watch(modalData, (val) => {
    if (modalType.value === EditEnum.NEW) {
        columnTableData.value.push(val);
    } else {

    }
});

/**
 * 路由守卫
 */
let routeGuardActive = true;
onBeforeRouteLeave((to) => {
    if (routeGuardActive) {
        return new Promise(resolve => {
            Modal.confirm({
                title: '退出确认',
                content: '当前更改未保存，确定要退出吗？',
                onOk: () => {
                    routeGuardActive = false;
                    resolve(to);
                },
                onCancel: () => {
                    resolve(false);
                },
            });
        });
    }
});
/**
 * 数据交互与处理方法
 */
const getColumnData = async () => {
    const data = await getModelColumn(props.modelId);
    columnTableData.value = data.columns;
};

// getColumnData();
</script>

<template>
    <a-page-header
        h-48px lh-48px p-lr-normal p-tb-0 bg-ant__bg-container
        :title="modelData.model_name"
        :sub-title="modelData.model_full_name"
        @back="routeBack"
    />
    <div class="p-lr-normal calc:height-100%-72px">
        <a-steps
            m-tb-normal p-lr-normal
            :current="currentStep"
            :items="settingSteps"
        ></a-steps>
        <template v-if="currentStep === StepEnum.STEP1">
            <a-table bordered :row-selection="{ selectedRowKeys: selectedRowKeys, columnWidth: 50 }"
                     :columns="entityTableColumns" :data-source="columnTableData">
                <template #title>
                    <a-button ml-auto mr-12px type="primary" :icon="h(FolderAddOutlined)"
                              @click="handleEdit(EditEnum.NEW)">新增
                    </a-button>
                    <a-button type="primary" danger ghost :icon="h(DeleteOutlined)">删除</a-button>
                </template>
                <template #bodyCell="{ text, column, record }">
                    <template v-if="column.dataIndex === 'operation'">
                        <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record)">编辑</a-button>
                        <a-divider type="vertical"/>
                        <a-popconfirm
                            title="是否删除字段?"
                            @confirm="handleDelete(record.model_id)"
                        >
                            <a-button btn-in-table danger type="link">删除</a-button>
                        </a-popconfirm>
                    </template>
                    <template v-else-if="['primary_key', 'is_unique', 'auto_increment'].includes(column.dataIndex)">
                        {{ text ? '是' : '否'}}
                    </template>
                </template>
            </a-table>
            <div class="flex p-tb-16px">
                <a-button ml-auto mr-12px type="primary" @click="handleToStep(StepEnum.STEP2)"
                >下一步
                </a-button>
            </div>
        </template>
        <template v-else-if="currentStep === StepEnum.STEP2">
            <a-table :columns="validateTableColumns" :data-source="validateTableData">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'operation'">
                        <a-button p-lr-0 type="link" @click="handleEdit(EditEnum.EDIT, record)">编辑</a-button>
                        <a-divider type="vertical"/>
                        <a-popconfirm
                            title="是否删除字段?"
                            @confirm="handleDelete(record.model_id)"
                        >
                            <a-button p-lr-0 danger type="link">删除</a-button>
                        </a-popconfirm>
                    </template>
                    <template v-else-if="column.dataIndex === 'required'">
                        <a-switch v-model:checked="record.required"/>
                    </template>
                </template>
            </a-table>
            <div class="flex p-tb-16px">
                <a-button ml-auto @click="handleToStep(StepEnum.STEP1)"
                >上一步
                </a-button>
                <a-button ml-12px type="primary" @click="handleToStep(StepEnum.STEP3, 'save')"
                >仅保存模型
                </a-button>
                <a-button ml-12px type="primary" @click="handleToStep(StepEnum.STEP3, 'deploy')"
                >模型部署
                </a-button>
            </div>
        </template>
        <template v-else-if="currentStep === StepEnum.STEP3">
            <a-result
                status="success"
                title="成功"
                :sub-title="successType === 'save' ? '模型1配置已保存': '模型1配置已部署成功'"
            >
                <template #extra>
                    <a-button key="console" type="primary" @click="routeToPageDataModel">返回建模列表</a-button>
                    <a-button key="buy">其他1</a-button>
                    <a-button key="buy">其他2</a-button>
                </template>
            </a-result>
        </template>
    </div>
    <ColumnModal
        v-model:open="modalOpened"
        v-model:data="modalData"
        :type="modalType"
    />
</template>

<style scoped lang="less">
::v-deep(.ant-table-wrapper) {
    border-radius: 8px 8px 0 0;

    .ant-table-title {
        height: 58px;
        padding: 12px;
        display: flex;
    }

    .ant-pagination {
        margin: 0;
        padding: 16px 0;
        //background-color: var(--colorBgContainer);
    }
}

</style>
