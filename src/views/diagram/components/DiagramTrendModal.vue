<script setup lang="ts">
import type { QueryFormField } from '@/components/common/query-form/types';
import type { Recordable } from '@/types';

const open = defineModel('open', { default: false });

const props = defineProps<{
  tags?: string[];
}>();

const loading = ref<boolean>(false);

const tagStatList = ref<{
  nodeTag: string;
  // nodeDesc: string;
  max: number;
  min: number;
  avg: number;
}[]>([]);

const qForm = ref<Recordable<any>>({
  time: [dayjs().subtract(2, 'hours'), dayjs()],
  multiCheck: [],
  interval: 60,
});
const queryFields: QueryFormField[] = [
  {
    field: 'time',
    component: 'RangePicker',
    colSpan: 10,
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
    compProps: {
      placeholder: ['请选择开始时间', '请选择结束时间'],
      showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
    },
  },
  {
    field: 'multiCheck',
    component: 'Checkbox',
    colSpan: 4,
    compProps: {
      options: [{
        label: '多坐标轴',
        value: 'multiCheck',
      }],
    },
  },
  {
    label: '间隔',
    field: 'interval',
    colSpan: 4,
    component: 'Select',
    compProps: {
      options: [{
        label: '60s',
        value: '60',
      }, {
        label: '120s',
        value: '120s',
      }],
    },
  },
];

const columns = [
  {
    title: '测点',
    dataIndex: 'nodeTag',
  },
  {
    title: '描述',
    dataIndex: 'nodeDesc',
  },
  {
    title: '平均值',
    dataIndex: 'avg',
  },
  {
    title: '最大值',
    dataIndex: 'max',
  },
  {
    title: '最小值',
    dataIndex: 'min',
  },
];

watch(open, (v) => {
  if (v && props.tags) {
    fetch();
  }
});

// ECharts 初始化
const chartRef = ref<ComponentPublicInstance>();
const { renderECharts, setEChartsLoading } = useECharts(chartRef!);

const fetch = async () => {
  if (!props.tags) return;
  setEChartsLoading(true);
  const tags = props.tags.join('|');
  const dataList = await getTrendData({
    tags,
    st: qForm.value.time[0],
    ed: qForm.value.time[1],
    interval: 60,
    type: HisDataType.TIME_VALUE_ARR,
  });

  // const { data } = await getDesc(tags);

  tagStatList.value = [];
  props.tags.forEach((item: string, index) => {
    const tagValue = dataList.map((it: string[]) => isNaN(Number(it[index + 1])) ? 0 : Number(it[index + 1]));
    const sm = sum(tagValue);
    const avg = unref(usePrecision(sm / tagValue.length, 2));
    tagStatList.value.push({
      nodeTag: item,
      // nodeDesc: data?.[(item).toLowerCase()] ? data?.[(item).toLowerCase()].description : '无',
      max: max(tagValue),
      min: min(tagValue),
      avg,
    });
  });

  const multiCheck = qForm.value.multiCheck?.includes('multiCheck');

  const yAxisItem = {
    type: 'value',
    position: 'left',
    axisTick: { show: false },
    alignTicks: true,
    axisLabel: {
      hideOverlap: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  };

  try {
    await renderECharts(merge({}, generalLineChartOption, {
      grid: {
        left: multiCheck ? 40 + (props.tags.length - 1) * 30 + 'px' : '40px',
      },
      legend: {
        data: props.tags.map(item => {
          return { name: item, icon: 'rect' };
        }),
      },
      yAxis: multiCheck ? props.tags.map((_, index) => {
        return Object.assign({}, yAxisItem, {
          // name: item,
          offset: 30 * index,
        });
      }) : [yAxisItem],
      series: props.tags.map((item, index) => {
        let series = {
          name: item,
          type: 'line',
          symbol: 'none',
        };
        if (multiCheck) {
          series = Object.assign(series, {
            yAxisIndex: index,
          });
        }
        return series;
      }),
      dataset: {
        source: dataList,
      },
    }), true);
  } finally {
    setEChartsLoading(false);
  }
};

</script>

<template>
  <a-modal v-model:open="open"
    title="测点趋势"
    width="1100px"
    :confirm-loading="loading"
    :footer="null"
  >
    <QueryForm class="pt-4 pb-1 sticky top-0 z-12"
      :fields="queryFields"
      v-model:form="qForm"
      @query="fetch">
    </QueryForm>
    <ECharts class="h-500px" ref="chartRef" />
    <a-table :columns="columns" :data-source="tagStatList" :pagination="false">
    </a-table>
  </a-modal>
</template>
