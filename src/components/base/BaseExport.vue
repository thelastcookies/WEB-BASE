<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue';

const props = withDefaults(defineProps<{
  dom?: string | string[];
  exportName?: string;
}>(), {
  dom: 'table',
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
  let domList: HTMLTableElement[] = [];
  if (props.dom instanceof Array) {
    props.dom.forEach(item => {
      domList.push(getDomById(item)!);
    });
  } else {
    let dom = getDomById(props.dom)!;
    domList.push(dom);
  }
  if (key === 'Excel') {
    const nameList = props.dom instanceof Array ? props.dom : [];
    exportTableAsXlsx(domList, props.exportName, nameList);
  } else if (key === 'Word') {
    exportTableAsDocx(domList, props.exportName);
  } else if (key === 'PDF') {
    const app = document.getElementById('app')!;
    domList.forEach(dom => {
      dom.style.position = 'fixed';
      dom.style.width = '100%';
      dom.style.maxWidth = '1500px';
      dom.classList.add('export-table-as-pdf');
      app.appendChild(dom);
    });

    await exportTableAsPdf(domList, props.exportName);
    const elements = document.querySelectorAll('.export-table-as-pdf');
    elements.forEach(ele => {
      ele.remove();
    });
  }
};

const getDomById = (id: string) => {
  let dom = document.getElementById(id)!;
  if (!dom) {
    console.error(`BaseExport 'getDomById': Failed to get the export DOM`);
    return;
  }
  const wrapper = dom.closest('.ant-table-wrapper')!;
  const copy = wrapper.cloneNode(true) as HTMLTableElement;
  // 移除不进行导出的行列
  const removes = copy.querySelectorAll([...removeCols, ...removeRows].join(','));
  for (let i = 0, len = removes.length; i < len; i++) {
    removes[i].remove();
  }
  return copy;
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
