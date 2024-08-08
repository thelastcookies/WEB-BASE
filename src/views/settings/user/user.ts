import { type ColProps, TableColumnProps } from "ant-design-vue";

export const userTableColumns: TableColumnProps[] = [
  {
    title: "账号",
    dataIndex: "UserName",
  },
  {
    title: "用户名",
    width: 120,
    dataIndex: "RealName",
  },
  {
    title: "性别",
    width: 80,
    dataIndex: "SexText",
  },
  {
    title: "备注",
    dataIndex: "Remark",
  },
  {
    title: "生日",
    dataIndex: "BirthdayText",
  },
  {
    title: "角色",
    dataIndex: "RoleNames",
  },
  {
    title: "操作",
    width: 160,
    dataIndex: "operation",
  },
];


// "PageIndex": 0,
//   "PageRows": 0,
//   "SortField": "string",
//   "SortType": "string",
//   "Search": {
//   "all": true,
//     "userId": "string",
//     "keyword": "string",
//     "userName": "string",
//     "roleId": "string"
// }

export interface SearchFormField {
  label: string;
  field: string;
  placeholder: string;
  component: string;
  colProps: ColProps;
}

export const userTableSearchFields: SearchFormField[] = [
  {
    label: "关键字",
    field: "keyword",
    placeholder: "请输入关键字",
    component: "Input",
    colProps: { span: 5 },
  },
];
