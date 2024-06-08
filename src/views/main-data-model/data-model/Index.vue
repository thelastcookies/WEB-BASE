<script setup lang="ts">
import {h} from 'vue';
import {DeleteOutlined, FolderAddOutlined, LoginOutlined, LogoutOutlined, SyncOutlined} from '@ant-design/icons-vue';
import type {Key} from "@/types";
import type {Model} from "@/api/data/model/types";
import {message} from "ant-design-vue";

/**
 * 查询方法
 */
const modelName = ref();
const onModelNameSearch = () => {
};

/**
 * table 属性与方法
 */
const columns = [{
    title: '模型名称',
    width: 160,
    dataIndex: 'model_name',
}, {

    title: '模型中文名称',
    width: 380,
    dataIndex: 'model_full_name',
}, {

    title: '备注',
    dataIndex: 'model_remark',
}, {

    title: '状态',
    width: 80,
    dataIndex: 'model_status',
}, {

    title: '操作',
    width: 200,
    dataIndex: 'operation',
}, {

    title: '同步',
    width: 70,
    dataIndex: 'sync',
}];
const selectedRowKeys: Key[] = [];

const data = ref([] as Model[]);

const handleEdit = (type: number, model?: Model) => {
    modalOpened.value = true;
    modalType.value = type;
    if (type === EditEnum.EDIT) {
        if (model) modalData.value = {...model};
    }
};
const handleDelete = (modelId: number) => {
    delModel(modelId).then(({result}) => {
        if (!result) return Promise.reject();
        message.success({content: '删除成功'});
        getTableData();
    }).catch(_ => {
        message.error({content: '删除失败'});
    });
};

const handleRouteToModelSetting = (modelId: number) => {
    routeTo({
        name: "modelEditor",
        params: {modelId},
    });
};
/**
 * 模态框
 */
const modalOpened = ref(false);
const modalType = ref(EditEnum.NEW);
const modalData = ref({} as Model);
/**
 * 数据交互与处理方法
 */
const getTableData = async () => {
    const res = await getModels();
    data.value = res.rec.map(item => Object.assign(item, {model_status: item.model_status === 1}));
};

const handleEditModelStatus = (modelId: number, status: boolean) => {
    const loadingKey = 'loadingKey';
    message.loading({
        content: '正在提交中',
        key: loadingKey,
        duration: 0,
    });
    let model = data.value.find(model => model.model_id === modelId) as Model;
    updModel(Object.assign({...model}, {
        model_status: status ? 1 : 0,
    })).then(({result}) => {
        if (!result) return Promise.reject();
        message.success({
            content: '提交成功',
            key: loadingKey,
        });
        getTableData();
    }).catch(_ => {
        message.error({
            content: '提交失败',
            key: loadingKey,
        });
    });
};

/**
 * 初始化调用
 */
getTableData();
</script>

<template>
    <div class="h-full p-normal">
        <div class="h-50px flex bg-ant__bg-container">
            <a-input-search
                class="ml-15px w-340px"
                v-model:value="modelName"
                placeholder="请输入模板名称"
                @search="onModelNameSearch"
            />
            <a-input-search
                class="ml-14px w-340px"
                v-model:value="modelName"
                placeholder="请输入模板中文名称"
                @search="onModelNameSearch"
            />
            <a-button ml-auto mr-12px type="primary" :icon="h(FolderAddOutlined)"
                      @click="handleEdit(EditEnum.NEW)">新增
            </a-button>
            <a-button mr-12px type="primary" danger ghost :icon="h(DeleteOutlined)">删除</a-button>
            <a-button mr-12px :icon="h(LoginOutlined)">导入</a-button>
            <a-button mr-15px :icon="h(LogoutOutlined)">导出</a-button>
        </div>
        <div class="calc:height-100%-74px bg-ant__bg-container m-t-normal">
            <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, columnWidth: 50 }"
                     :columns="columns" :data-source="data">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'operation'">
                        <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record)">编辑</a-button>
                        <a-divider type="vertical"/>
                        <template v-if="record.model_status">
                            <a-tooltip title="数据模型启用时不可删除" arrow-point-at-center
                                       :mouseEnterDelay="1" destroyTooltipOnHide>
                                <a-button btn-in-table danger disabled type="link">删除</a-button>
                            </a-tooltip>
                        </template>
                        <template v-else>
                            <a-popconfirm
                                title="是否删除模型?"
                                @confirm="handleDelete(record.model_id)"
                            >
                                <a-button btn-in-table danger type="link">删除</a-button>
                            </a-popconfirm>
                        </template>
                        <a-divider type="vertical"/>
                        <a-button btn-in-table type="link" @click="handleRouteToModelSetting(record.model_id)">模型配置
                        </a-button>
                    </template>
                    <template v-else-if="column.dataIndex === 'model_status'">
                        <a-popconfirm
                            v-if="data.length"
                            :title="`是否${record.model_status? '禁用': '启用'}模型?`"
                            @confirm="handleEditModelStatus(record.model_id, !record.model_status)"
                        >
                            <a-switch :checked="record.model_status"/>
                        </a-popconfirm>
                    </template>
                    <template v-else-if="column.dataIndex === 'sync'">
                        <a-button type="primary" ghost :disabled="!record.sync" :icon="h(SyncOutlined)"/>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
    <DataModelModal
        v-model:open="modalOpened"
        :type="modalType"
        :data="modalData"
        @refresh="getTableData"
    />
</template>
