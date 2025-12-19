<script setup lang="ts">
import type { QueryFormField } from '@/components/common/query-form/types';
import type { Rule } from 'ant-design-vue/es/form';
import type { Recordable } from '@/types';
import type { Dayjs } from 'dayjs';

const queryFields: QueryFormField[] = [
  {
    label: '文本',
    field: 'InputName',
    component: 'Input',
    compProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '多行文本',
    field: 'TextareaName',
    component: 'Textarea',
    compProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '数字范围',
    field: 'NumberRangeName',
    component: 'NumberRange',
    compProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      placeholder: '请选择',
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '时间',
    field: 'DatePickerName',
    component: 'DatePicker',
    compProps: {
      placeholder: '请选择时间',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '起止时间',
    field: 'RangePickerName',
    component: 'DateRangePicker',
    compProps: {
      placeholder: ['请选择开始时间', '请选择结束时间'],
    },
  },
  {
    label: '起止月份',
    field: 'MonthRangePickerName',
    component: 'DateRangePicker',
    compProps: {
      picker: 'month',
      placeholder: ['请选择开始月份', '请选择结束月份'],
    },
  },
  {
    label: '起止年秒',
    field: 'TimeRangePickerName',
    component: 'DateRangePicker',
    compProps: {
      disabledDate: (current: Dayjs) => {
        return current && (current.isAfter(dayjs(), 'day') || current.isBefore(dayjs().subtract(2, 'month'), 'day'));
      },
      disabledTime: (current: Dayjs, type: 'start' | 'end') => {
        const now = dayjs();
        if (current && current.isSame(now, 'day')) {
          return {
            disabledHours: () => Array.from({ length: 24 }, (_, i) => i).filter((h) => h > now.hour()),
            disabledMinutes: (hour: number) => {
              if (hour === now.hour()) {
                return Array.from({ length: 60 }, (_, i) => i).filter((m) => m > now.minute());
              }
              return [];
            },
            disabledSeconds: (hour: number, minute: number) => {
              if (hour === now.hour() && minute === now.minute()) {
                return Array.from({ length: 60 }, (_, i) => i).filter((s) => s > now.second());
              }
              return [];
            },
          };
        }
        return {};
      },
      placeholder: ['请选择开始时间', '请选择结束时间'],
      showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
      presets: [
        { label: '近15分钟', value: [dayjs().subtract(15, 'm'), dayjs()] },
        { label: '近一小时', value: [dayjs().subtract(1, 'h'), dayjs()] },
        { label: '近八小时', value: [dayjs().subtract(8, 'h'), dayjs()] },
        { label: '近一天', value: [dayjs().subtract(1, 'd'), dayjs()] },
        { label: '近三天', value: [dayjs().subtract(3, 'd'), dayjs()] },
        { label: '近一周', value: [dayjs().subtract(7, 'd'), dayjs()] },
        { label: '近十五天', value: [dayjs().subtract(15, 'd'), dayjs()] },
        { label: '近一个月', value: [dayjs().subtract(1, 'M'), dayjs()] },
      ],
    },
  },
];

// TODO 时区问题
const qForm = ref<Recordable<any>>({
  InputName: '1234',
  NumberRangeName: [0, 100],
  RangePickerName: [dayjs().subtract(8, 'h'), dayjs()],
  MonthRangePickerName: [dayjs(), dayjs()],
  TimeRangePickerName: [dayjs().subtract(2, 'hours'), dayjs()],
});
const onQuery = (form: Record<string, string>) => {
  qForm.value = form;
};

const rules: Record<string, Rule[]> = {
  InputName: [
    { required: true, message: '文本内容不可为空' },
    { min: 3, max: 5, message: '文本内容长度要在 3 到 5 之间' },
  ],
  NumberRangeName: [{
    validator(_, value) {
      if (!value || value.length !== 2) {
        return Promise.reject('请选择数字范围');
      }
      const [floor, ceil] = value;
      if (floor < 0) {
        return Promise.reject('数字选择下限不可小于0');
      }
      if (ceil > 10) {
        return Promise.reject('数字选择上限不可大于10');
      }
      if (ceil < floor) {
        return Promise.reject('数字选择上限不可小于下限');
      }
      return Promise.resolve();
    },
  }],
  DatePickerName: [{ required: true, message: '时间选择不可为空' }],
  RangePickerName: [{
    validator(_, value) {
      if (!value || value.length !== 2) {
        return Promise.reject('请选择时间范围');
      }
      const [start, end] = value;
      if (dayjs(start).isSame(end, 'month')) {
        return Promise.resolve();
      }
      return Promise.reject('起止时间不可跨月');
    },
  }],
  TimeRangePickerName: [{
    validator(_, value) {
      if (!value || value.length !== 2) {
        return Promise.reject('请选择时间范围');
      } else return Promise.resolve();
    },
  }],
};

const checkFields: QueryFormField[] = [
  {
    label: '单选组',
    field: 'RadioName',
    component: 'Radio',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '多选组',
    field: 'CheckboxName',
    component: 'Checkbox',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '多选组全选',
    field: 'CheckboxAllName',
    component: 'Checkbox',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    compProps: {
      selectAllEnable: true,
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
];
const cForm = ref<Recordable<any>>({
  RadioName: 'valueA',
  CheckboxName: ['valueA'],
  CheckboxAllName: ['valueA', 'valueB', 'valueC', 'valueD'],
});

const selectFields: QueryFormField[] = [
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '下拉框多选',
    field: 'selectMultiName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '下拉框全选',
    field: 'selectAllName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      selectAllEnable: true,
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: 'Api下拉框',
    field: 'apiSelectName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      getOptions: async () => {
        const res = await getUserList({});
        return res.Data!.map(user => {
          return {
            label: user.RealName,
            value: user.Id,
          };
        });
      },
    },
  },
  {
    label: '树下拉框',
    field: 'TreeSelectName',
    component: 'TreeSelect',
    compProps: {
      treeNodeFilterProp: 'label',
      treeData: [{
        label: '选项A',
        value: 'valueA',
        children: [{
          label: '选项AA',
          value: 'valueAA',
        }, {
          label: '选项AB',
          value: 'valueAB',
        }],
      }, {
        label: '选项B',
        value: 'valueB',
        children: [{
          label: '选项BA',
          value: 'valueBA',
        }, {
          label: '选项BB',
          value: 'valueBB',
        }, {
          label: '选项BC',
          value: 'valueBC',
        }],
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '树平铺格式',
    field: 'TreeIdPidName',
    component: 'TreeSelect',
    compProps: {
      treeCheckable: true,
      treeDataSimpleMode: true,
      treeNodeFilterProp: 'label',
      treeData: [{
        id: 'valueA',
        pId: null,
        label: '选项A',
        value: 'valueA',
      }, {
        id: 'valueAA',
        pId: 'valueA',
        label: '选项AA',
        value: 'valueAA',
      }, {
        id: 'valueAB',
        pId: 'valueA',
        label: '选项AB',
        value: 'valueAB',
      }, {
        id: 'valueAC',
        pId: 'valueA',
        label: '选项AC',
        value: 'valueAC',
      }, {
        id: 'valueB',
        pId: null,
        label: '选项B',
        value: 'valueB',
      }, {
        id: 'valueBA',
        pId: 'valueB',
        label: '选项BA',
        value: 'valueBA',
      }, {
        id: 'valueBB',
        pId: 'valueB',
        label: '选项BB',
        value: 'valueBB',
      }, {
        id: 'valueBC',
        pId: 'valueB',
        label: '选项BC',
        value: 'valueBC',
      }],
    },
  },
  {
    label: 'Api树下拉框',
    field: 'apiTreeSelectName',
    component: 'TreeSelect',
    compProps: {
      fieldNames: {
        value: 'Id',
        label: 'Name',
        children: 'Children',
      },
      treeCheckable: true,
      getTreeData: async () => {
        const res = await getMenuTreeList({});
        return createTree(res.Data!);
      },
    },
  }];
const sForm = ref<Recordable<any>>({
  selectName: 'valueA',
  selectAllName: ['valueA', 'valueB', 'valueC', 'valueD'],
  apiSelectName: ['1522888670812573696', '1181928860648738816', 'Admin'],
});

const cascadeFields: QueryFormField[] = [
  {
    label: '级联父级—性别',
    field: 'casSexField',
    labelCol: { span: 7 },
    component: 'Select',
    compProps: {
      options: [{
        label: '男',
        value: 1,
      }, {
        label: '女',
        value: 0,
      }],
    },
  },
  {
    label: '级联子级—用户',
    field: 'casUserField',
    labelCol: { span: 7 },
    component: 'Select',
    compProps: {
      cascadeParentField: 'casSexField',
      mode: 'multiple',
      getOptions: async (form: Recordable<any>) => {
        if (form.casSexField == null) return;
        const res = await getUserList({});
        return res.Data!.filter(user => user.Sex === form.casSexField).map(user => {
          return {
            label: user.RealName,
            value: user.Id,
          };
        });
      },
    },
  },
];
const casForm = ref<Recordable<any>>({
  casSexField: 1,
  casUserField: [],
});

const otherFields: QueryFormField[] = [
  {
    label: '示例字段1',
    field: 'InputName',
    component: 'Input',
    colSpan: 4,
    labelCol: { span: 8, offset: 2 },
    wrapperCol: { span: 8, offset: 2 },
    compProps: {
      placeholder: '',
    },
  },
  {
    label: '示例字段2',
    field: 'InputName',
    component: 'Input',
    colSpan: 8,
    compProps: {
      placeholder: 'colSpan: 4',
    },
  },
];
const otherForm = ref<Recordable<any>>({
  casSexField: 1,
  casUserField: [],
});

</script>
<template>
  <div class="w-full">
    <a-divider>文本、数字范围、时间与校验</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="queryFields"
        :rules="rules"
        v-model:form="qForm"
        @query="onQuery"
      >
      </QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="w-50% pl-8">
        <div class="text-5">QueryForm</div>
        <div v-for="(value, key) in qForm">{{ key }}: {{ value }}</div>
      </div>
      <div class="w-50% pl-8">
        <div class="text-5">Rules</div>
        <div v-for="(value, key) in rules">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <a-divider>单选、多选框</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="checkFields"
        v-model:form="cForm"
      ></QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="pl-8">
        <div class="text-5">CheckableForm</div>
        <div v-for="(value, key) in cForm">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <a-divider>选择器、树选择器</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="selectFields"
        v-model:form="sForm"
      ></QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="pl-8">
        <div class="text-5">SelectableForm</div>
        <div v-for="(value, key) in sForm">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <a-divider>级联选择器</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="cascadeFields"
        v-model:form="casForm"
      ></QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="pl-8">
        <div class="text-5">CascadeForm</div>
        <div v-for="(value, key) in casForm">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <a-divider>自定义列、插槽</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="otherFields"
        v-model:form="otherForm"
      >
        <div class="flex justify-between">
          <BaseIcon icon="i-mdi:flag-triangle" class="c-red" />
          默认插槽内容
          <BaseIcon icon="i-mdi:flag-triangle" class="c-green" />
        </div>
        <template #btn>
          <a-button>#btn 插槽内容，覆盖全部按钮</a-button>
        </template>
      </QueryForm>
      <QueryForm
        :expand="true"
        :fields="otherFields"
        v-model:form="otherForm"
      >
        <template #fst-btn>
          <a-button>#fst-btn 插槽内容</a-button>
        </template>
        <template #snd-btn>
          <a-button class="ml-2" danger>#snd-btn 插槽内容</a-button>
        </template>
      </QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="pl-8 w-50%">
        <p class="text-5">自定义列说明：</p>
        <p>
          每个字段所占用的 colSpan 默认为：24 / 一行展示的字段数。
        </p>
        <p>
          字段内的 label span 默认为 6，表单组件 span 默认为 18，
          即：
          <code>
            <br />
            labelCol: { span: 6 }
            <br />
            wrapperCol: { span: 18 }
          </code>
        </p>
        <p>
          示例字段1配置：
          <code>
            <br />
            colSpan: 4,
            <br />
            labelCol: { span: 8, offset: 2 },
            <br />
            wrapperCol: { span: 8, offset: 2 },
          </code>
        </p>
        <p>
          示例字段2配置：
          <code>
            <br />
            colSpan: 8
          </code>
        </p>
      </div>
      <div class="pl-8 w-50%">
        <p class="text-5">插槽说明：</p>
        <p>
          QueryForm 当前支持的插槽有如下几个：
        </p>
        <ol>
          <li>默认插槽，位置在操作按钮前，用于扩展当前不支持的表单以及非表单内容。</li>
          <li>name 为 btn 的插槽，默认内容为按钮区，即「查询」与「清空」按钮。使用该插槽会覆盖所有按钮。</li>
          <li>name 为 snd-btn 的插槽，默认内容为「清空」按钮。使用该插槽会覆盖按钮「清空」按钮。</li>
        </ol>
        <p>
          第一行的 QueryForm 演示了默认插槽与 #btn 插槽的使用。
        </p>
        <p>
          第二行的 QueryForm 演示了 #snd-btn 插槽的使用。
        </p>
      </div>
    </div>
  </div>
</template>
