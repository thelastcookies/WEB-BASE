<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue';

const props = withDefaults(defineProps<{
  domId?: string;
  exportName?: string;
}>(), {
  domId: 'table',
  exportName: '导出',
});

// 移除列
const removeCols = [
  // 选择器列
  '.ant-table-selection-col',
  '.ant-table-selection-column',
  // 明确指定不导出的列
  '.un-export-column',
];

// 移除行
const removeRows = [
  // 测量行
  '.ant-table-measure-row',
];

const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
  let dom = document.getElementById(props.domId)!;
  if (!dom) {
    console.error(`BaseExport 'handleMenuClick': Failed to get the export DOM`);
    return;
  }
  const wrapper = dom.closest('.ant-table-wrapper')!;
  const copy = wrapper.cloneNode(true) as HTMLTableElement;
  // 移除不进行导出的行列
  const removes = copy.querySelectorAll([...removeCols, ...removeRows].join(','));
  for (let i = 0, len = removes.length; i < len; i++) {
    removes[i].remove();
  }
  if (key === 'Excel') {
    exportTableAsXlsx(copy, props.exportName);
  } else if (key === 'Word') {
    exportTableAsDocx(copy, props.exportName);
  } else if (key === 'PDF') {
    copy.style.position = 'fixed';
    copy.style.width = '100%';
    copy.style.maxWidth = '1500px';
    const app = document.getElementById('app')!;
    app.appendChild(copy);
    await exportTableAsPdf(copy, props.exportName);
    app.removeChild(copy);
  }
};
</script>

<template>
  <a-dropdown trigger="click">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="Excel">
          <BaseIcon icon="i-mdi-file-excel-box-outline" />
          导出为 Excel
        </a-menu-item>
        <a-menu-item key="Word">
          <BaseIcon icon="i-mdi-file-word-box-outline" />
          导出为 Word
        </a-menu-item>
        <a-menu-item key="PDF">
          <BaseIcon icon="i-mdi-file-pdf-box-outline" />
          导出为 PDF
        </a-menu-item>
      </a-menu>
    </template>
    <a-button ml-2 pr-2>
      <BaseIcon icon="i-mdi-logout" />
      导出
      <BaseIcon icon="i-mdi-chevron-down" />
    </a-button>
  </a-dropdown>
</template>
