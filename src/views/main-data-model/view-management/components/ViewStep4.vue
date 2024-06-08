<script setup lang="ts">
import {h} from "vue";
import {DownOutlined, UpOutlined} from "@ant-design/icons-vue";

const columns = [{
    title: '默认排序',
    dataIndex: 'index',
}, {
    title: '字段名称',
    dataIndex: 'name',
}, {
    title: '字段中文名称',
    dataIndex: 'desc',
}, {
    title: '视图显示',
    dataIndex: 'show',
    width: 90,
}, {
    title: '手动排序',
    dataIndex: 'sort',
    width: 120,
}];

const data = [{
    name: 'field-01',
    desc: '字段1',
    show: true,
},{
    name: 'field-01',
    desc: '字段1',
    show: false,
},{
    name: 'field-01',
    desc: '字段1',
    show: false,
},{
    name: 'field-01',
    desc: '字段1',
    show: false,
},{
    name: 'field-01',
    desc: '字段1',
    show: true,
}];
</script>

<template>
    <div class="h-full w-full">
        <a-table :columns="columns" :data-source="data" :pagination="false">
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'operation'">
                    <a-popconfirm
                        title="Sure to delete?"
                        @confirm=""
                    ><a class="c-ant__primary-text">编辑</a></a-popconfirm>
                    <a-divider type="vertical"/>
                    <a-popconfirm
                        title="Sure to delete?"
                        @confirm=""
                    ><a class="c-ant__error-text">删除</a></a-popconfirm>
                </template>
                <template v-else-if="column.dataIndex === 'show'">
                    <a-switch v-model:checked="record.show"/>
                </template>
                <template v-else-if="column.dataIndex === 'index'">
                    {{ index + 1}}
                </template>
                <template v-else-if="column.dataIndex === 'sort'">
                    <a-button type="primary" mr-12px ghost :icon="h(UpOutlined)" @click=""></a-button>
                    <a-button type="primary" ghost :icon="h(DownOutlined)"  @click=""></a-button>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style scoped lang="less">

</style>
