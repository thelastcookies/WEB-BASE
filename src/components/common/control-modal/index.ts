import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';

export const controlRealTimeTableColumns: TableEditableColumnProps[] = [
  { title: '时间', dataIndex: 'Time', width: 100 },
  { title: '操作', dataIndex: 'Action', width: 100 },
  { title: '描述', dataIndex: 'Des' },
  { title: '状态', dataIndex: 'Result', width: 50 },
  { title: '场站名称', dataIndex: 'SName', width: 80 },
];

export const controlHistoricalTableColumns: TableEditableColumnProps[] = [
  { title: '时间', dataIndex: 'CreateTime', width: 100 },
  { title: '操作', dataIndex: 'Action', width: 100 },
  { title: '描述', dataIndex: 'LogContent' },
  { title: '状态', dataIndex: 'State', width: 50 },
  { title: '场站名称', dataIndex: 'SName', width: 80 },
];
