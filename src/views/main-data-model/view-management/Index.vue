<script setup lang="ts">
import {h} from "vue";
import {DeleteOutlined, FolderAddOutlined, LoginOutlined, LogoutOutlined} from "@ant-design/icons-vue";
import type {Key} from "@/types";
import type {View} from "@/api/data/view/types";
import {message} from "ant-design-vue";

/**
 * 查询方法
 */
const viewName = ref();
const onViewNameSearch = () => {
};

/**
 * table 属性与方法
 */
const columns = [{
    title: '视图名称',
    width: 160,
    dataIndex: 'view_name',
}, {
    title: '视图中文名称',
    width: 380,
    dataIndex: 'view_full_name',
}, {
    title: '视图类型',
    dataIndex: 'view_type',
}, {
    title: '状态',
    dataIndex: 'view_status',
}, {
    title: '操作',
    dataIndex: 'operation',
}];

const selectedRowKeys: Key[] = [];

const data = ref([] as View[]);

const handleDelete = (viewId: number) => {
    delView(viewId).then(({result}) => {
        if (!result) return Promise.reject();
        message.success({content: '删除成功'});
        getTableData();
    }).catch(_ => {
        message.error({content: '删除失败'});
    });
};

const handleRouteToViewEditor = (viewId: number) => {
    routeTo({
        name: "viewEditor",
        params: {viewId},
    });
};

/**
 * 数据交互与处理方法
 */
const getTableData = async () => {
    const res = await getViews();
    data.value = res.rec.map(item => Object.assign(item, {view_status: item.view_status === 1}));
};

const handleEditViewStatus = (viewId: number, status: boolean) => {
    const loadingKey = 'loadingKey';
    message.loading({
        content: '正在提交中',
        key: loadingKey,
        duration: 0,
    });
    let view = data.value.find(view => view.view_id === viewId) as View;
    updView(Object.assign({...view}, {
        view_status: status ? 1 : 0,
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
    <div class="h-50px flex bg-ant__bg-container m-lrt-normal">
        <a-input-search
            class="ml-15px w-340px"
            v-model:value="viewName"
            placeholder="请输入模板名称"
            @search="onViewNameSearch"
        />
        <a-input-search
            class="ml-14px w-340px"
            v-model:value="viewName"
            placeholder="请输入模板中文名称"
            @search="onViewNameSearch"
        />
        <a-button ml-auto mr-12px type="primary" :icon="h(FolderAddOutlined)">新增</a-button>
        <a-button mr-12px type="primary" danger ghost :icon="h(DeleteOutlined)">删除</a-button>
        <a-button mr-12px :icon="h(LoginOutlined)">导入</a-button>
        <a-button mr-15px :icon="h(LogoutOutlined)">导出</a-button>
    </div>
    <div class="calc:height-100%-122px bg-ant__bg-container m-lrtb-normal">
        <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, columnWidth: 50 }"
                 :columns="columns" :data-source="data">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'operation'">
                    <a-divider type="vertical"/>
                    <template v-if="record.view_status">
                        <a-tooltip title="视图启用时不可删除" arrow-point-at-center
                                   :mouseEnterDelay="1" destroyTooltipOnHide>
                            <a-button btn-in-table type="link">编辑</a-button>
                        </a-tooltip>
                    </template>
                    <template v-else>
                        <a-button btn-in-table type="link" @click="handleRouteToViewEditor(record.view_id)">编辑</a-button>
                    </template>
                </template>
                <template v-else-if="column.dataIndex === 'view_status'">
                    <a-popconfirm
                        v-if="data.length"
                        :title="`是否${record.view_status? '禁用': '启用'}视图?`"
                        @confirm="handleEditViewStatus(record.view_id, !record.view_status)"
                    >
                        <a-switch :checked="record.view_status"/>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style scoped lang="less">

</style>
