<script setup lang="ts">
const columns = [{
    title: '字段名称',
    dataIndex: 'name',
}, {
    title: '字段中文名称',
    dataIndex: 'desc',
}, {
    title: '是否查询项',
    dataIndex: 'queryable',
    width: 90,
}, {
    title: '查询项设置',
    dataIndex: 'dict',
}, {
    title: '是否排序',
    dataIndex: 'sortable',
    width: 90,
}];

const data = [{
    name: 'field-01',
    desc: '字段1',
    queryable: true,
    dict: 'item0',
    sortable: false,
},{
    name: 'field-01',
    desc: '字段1',
    queryable: false,
    dict: 'item0',
    sortable: true,
},{
    name: 'field-01',
    desc: '字段1',
    queryable: false,
    dict: 'item0',
    sortable: false,
},{
    name: 'field-01',
    desc: '字段1',
    queryable: false,
    dict: 'item0',
    sortable: false,
},{
    name: 'field-01',
    desc: '字段1',
    queryable: true,
    dict: 'item0',
    sortable: true,
}];
</script>

<template>
    <div class="h-full w-full">
        <a-table :columns="columns" :data-source="data" :pagination="false">
            <template #bodyCell="{ column, record }">
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
                <template v-else-if="column.dataIndex === 'queryable'">
                    <a-switch v-model:checked="record.queryable"/>
                </template>
                <template v-else-if="column.dataIndex === 'sortable'">
                    <a-switch v-model:checked="record.sortable"/>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style scoped lang="less">

</style>
