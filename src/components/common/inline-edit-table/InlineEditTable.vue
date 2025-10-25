<script setup lang="ts">
import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';

const dataSource = defineModel<any[]>('dataSource', {
  default: () => [],
});

const props = withDefaults(defineProps<{
  columns: TableEditableColumnProps[],
}>(), {
  columns: () => [],
});

const editableData: any[] = reactive([]);

const handleAdd = () => {
  const record = {};
  props.columns.forEach(col => {
    if (!col.editable) return;
    merge(record, { [col.dataIndex as string]: '' });
  });
  editableData[dataSource.value.length] = { ...record, new: true };
  dataSource.value.push(record);
};
const handleEdit = (idx: number) => {
  editableData[idx] = cloneDeep(dataSource.value[idx]);
};
const handleSave = (idx: number) => {
  if (editableData[idx].new) {
    delete editableData[idx].new;
  }
  Object.assign(dataSource.value[idx], editableData[idx]);
  editableData[idx] = null;
};
const handleCancel = (idx: number) => {
  if (editableData[idx].new) {
    editableData.splice(idx, 1);
    dataSource.value.splice(idx, 1);
  } else {
    editableData[idx] = null;
  }
};
const handleDelete = (idx: number) => {
  editableData.splice(idx, 1);
  dataSource.value.splice(idx, 1);
};
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false">
    <template #headerCell="{title, column}">
      <template v-if="column.dataIndex === 'operation'">
        <div class="flex justify-evenly">
          <span>{{ title }}</span>
          <a-button type="primary" size="small"
            @click="handleAdd">新增
          </a-button>
        </div>
      </template>
    </template>
    <template #bodyCell="{ column, text, index }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <div v-if="editableData[index]" class="flex justify-evenly">
            <a-button type="link" size="small" @click="handleSave(index)">保存</a-button>
            <a-popconfirm title="是否取消当前变更？" @confirm="handleCancel(index)">
              <a-button type="link" size="small">取消</a-button>
            </a-popconfirm>
          </div>
          <div v-else class="flex justify-evenly">
            <a-button type="link" size="small" @click="handleEdit(index)">编辑</a-button>
            <a-popconfirm title="是否确定删除？" @confirm="handleDelete(index)">
              <a-button type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
          </div>
        </div>
      </template>
      <template v-else-if="(column as TableEditableColumnProps).editable">
        <div>
          <a-input
            v-if="editableData[index]"
            v-model:value="editableData[index][column.dataIndex as string]"
            class="ml--2"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
    </template>
  </a-table>
</template>
