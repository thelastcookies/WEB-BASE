<script setup lang="ts">
import type { Dayjs } from 'dayjs';

const value = defineModel('value', { default: 0 });
const timeRange = defineModel<[Dayjs, Dayjs]>('timeRange', {
  default: () => [dayjs().subtract(2, 'h'), dayjs()],
});

const emit = defineEmits<{
  (e: 'query'): void
}>();

// 接口的历史取数间隔，单位：s
const HISTORICAL_INTERVAL = 60;

// 进度条最大值
const timeSliderMax = computed(() => timeRange.value[1].diff(timeRange.value[0], 's') / 60);

// 播放器的当前时间
const currentTime = ref('');
// 播放器的结束时间
const endTime = computed(() => timeRange.value[1].format('HH:mm:ss'));
// 播放器播放速度
const speed = ref(1000);
// 当前倍速值
const times = ref(1.0);
// 实际速度
const timedSpeed = computed(() => speed.value / times.value);
// 播放倍速设置
const timesOptions = [
  { value: 8.0, label: '8.0×' },
  { value: 4.0, label: '4.0×' },
  { value: 2.0, label: '2.0×' },
  { value: 1.0, label: '1.0×' },
  { value: 0.5, label: '0.5×' },
];
// 定时器
const { pause, resume, isActive } = useIntervalFn(() => {
  if (value.value === timeSliderMax.value - 1) {
    pause();
    value.value = 0;
  } else {
    value.value++;
  }
}, timedSpeed, {
  immediate: false,
});

watch(isActive, (val) => {
  if (val) {
    resume();
  } else {
    pause();
  }
});

// 播放器复位
const handleReset = () => {
  pause();
  value.value = 0;
};

// Slider tooltip
const formatter = (value?: number) => {
  value = value ? value : 0;
  const time = timeRange.value[0].add(value * HISTORICAL_INTERVAL, 's').format('YYYY-MM-DD HH:mm:ss');
  currentTime.value = time;
  return time;
};

</script>

<template>
  <div class="flex-1 m-2 p-2 flex gap-2 items-center bg-ant.bg-elevated
              rounded-ant.br b-ant.border b-1 b-solid z-ant.z1">
    <a-button type="primary" ghost shape="circle" @click="isActive = !isActive">
      <BaseIcon size="1.5" :icon="isActive ? 'i-mdi-pause' : 'i-mdi-play'" />
    </a-button>
    <a-button type="primary" danger ghost shape="circle" @click="handleReset">
      <BaseIcon size="1.5" icon="i-mdi-stop" />
    </a-button>
    <a-select class="w-20" v-model:value="times" :options="timesOptions"></a-select>
    <div class="w-32 text-center text-ant.font-size-xl">
      <span>{{ currentTime || '--:--:-- ' }}</span>
    </div>
    <div class="flex-1">
      <a-slider
        v-model:value="value"
        :tip-formatter="formatter"
        :max="timeSliderMax"
        :min="0"
      ></a-slider>
    </div>
    <div class="w-92">
      <a-range-picker
        show-time
        v-model:value="timeRange"
        :placeholder="['请选择开始时间', '请选择结束时间']"
      />
    </div>
    <div class="w-16">
      <a-button type="primary" @click="emit('query')">查询</a-button>
    </div>
  </div>
</template>
