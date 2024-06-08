<script setup lang="ts">
const columns = [
    {
        title: '主模型',
        children: [
            {
                title: '模型名称',
                dataIndex: 'mainName',
                key: 'mainName',
                width: 90,
            },
            {
                title: '字段名称',
                dataIndex: 'mainField',
                key: 'mainField',
            },
        ],
    }, {
        title: '关联模型',
        children: [
            {
                title: '模型名称',
                dataIndex: 'relatedName',
                key: 'relatedName',
                width: 90,
            },
            {
                title: '字段名称',
                dataIndex: 'relatedField',
                key: 'relatedField',
            },
        ],
    }
];
const data = [{
    key: 0,
    mainName: '员工信息',
    mainField: 'DEPARTMENT_ID',
    relatedName: '组织结构',
    relatedField: 'DEPARTMENT_ID',
}, {
    key: 1,
    mainName: '员工信息',
    mainField: 'DEPARTMENT_ID',
    relatedName: '岗位信息',
    relatedField: 'DEPARTMENT_ID',
},];

const mainTColumns = [
    {title: '主模型', dataIndex: 'title', key: 'title'},
];

const mainTData = [
    {
        key: 1,
        title: '员工信息',
        fieldList: Array(15).fill(0).map((item, i) => {
            return {
                label: "item" + i,
                value: "item" + i,
            }
        }),
        fieldSelectedList: [],
    }
];

const relatedTColumns = [
    {title: '关联模型', dataIndex: 'title', key: 'title'},
];
const relatedTData = [
    {
        key: 1,
        title: '部门信息',
        fieldList: Array(15).fill(0).map((item, i) => {
            return {
                label: "item" + i,
                value: "item" + i,
            }
        }),
        fieldSelectedList: [],
    },
    {
        key: 2,
        title: '岗位信息',
        fieldList: Array(15).fill(0).map((item, i) => {
            return {
                label: "item" + i,
                value: "item" + i,
            }
        }),
        fieldSelectedList: [],
    }
];
</script>

<template>
    <a-row w-full h-full :gutter="{md: 24}">
        <a-col h-full :span="11">
            <div class="h-full w-full p-tlb-normal">
                <div class="mb-normal">模型字段配置关联关系：</div>
                <a-table
                    :columns="columns"
                    :data-source="data"
                    bordered
                    :pagination="false"
                />
            </div>
        </a-col>
        <a-col h-full :span="13">
            <div class="h-full w-full ptb-normal overflow-y-auto">
                <div class="mb-normal">视图字段选择：</div>
                <a-table :columns="mainTColumns" :data-source="mainTData" :pagination="false">
                    <template #expandedRowRender="{ record }">
                        <a-checkbox-group v-model:value="record.fieldSelectedList" :options="record.fieldList" />
                    </template>
                </a-table>
                <a-table :columns="relatedTColumns" :data-source="relatedTData" :pagination="false">
                    <template #expandedRowRender="{ record }">
                        <a-checkbox-group v-model:value="record.fieldSelectedList" :options="record.fieldList" />
                    </template>
                </a-table>
            </div>
        </a-col>
    </a-row>
</template>

<style scoped lang="less">

</style>
