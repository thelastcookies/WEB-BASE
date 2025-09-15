import type { ColProps } from 'ant-design-vue';

export type QueryFormComponentType =
  'Input'
  | 'Textarea'
  | 'NumberRange'
  | 'Select'
  | 'TreeSelect'
  | 'Radio'
  | 'Checkbox'
  | 'DatePicker'
  | 'DateRangePicker'
  ;

export interface QueryFormField {
  label?: string;
  field: string;
  component: QueryFormComponentType;
  colSpan?: string | number;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  compProps?: {
    cascadeParentField?: string;
  } & any;
}
