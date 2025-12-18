<script setup lang="ts">
const { resetControlTagInfo } = useControlStore();
const { controlModalOpen, controlTagInfo, execLogs, controlCrtState } = storeToRefs(useControlStore());

const logType = ref<'rt' | 'his'>('his');
const loading = ref<boolean>(false);
const operateLogData = ref<HistoryLogRecord[]>([]);

const confirmOpen = ref(false);
const handleConfirm = () => {
  confirmOpen.value = true;
};

const { userInfo } = useUserStore();

const execForm = ref<ExecControlRequestBody>();

const currentState = computed(() => {
  //  "Status": "1:合闸,0:分闸"
  const statusConf = controlTagInfo.value.Status.split(',');
  const crtState = statusConf.find(it => it.search(controlCrtState.value) > -1);
  return crtState ? crtState.split(':')[1] : '';
});

const handleExec = async () => {
  logType.value = 'rt';
  loading.value = true;
  const operTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  let flag = '';
  execForm.value!.CreateTime = operTime;
  execControl(execForm.value!).then(res => {
    if (res.Success) {
      flag = '成功';
      message.success(res.Msg);
    } else {
      flag = res.Msg ? res.Msg : '失败';
      message.error(`失败，${res.Msg}`);
    }
  }).catch(_ => {
    flag = '失败';
    message.error('网络连接失败');
  }).finally(() => {
    execLogs.value.unshift({
      Time: operTime,
      Action: controlTagInfo.value.action!,
      Des: controlTagInfo.value.Des,
      Result: flag,
      SName: controlTagInfo.value.SName,
    });
    loading.value = false;
  });
};

const operDialogClosed = () => {
  controlModalOpen.value = false;
};

watch(controlModalOpen, (v) => {
  if (v) {
    if (!controlTagInfo.value) {
      message.error('获取测点信息失败');
      return;
    }
    logType.value = 'rt';
    execForm.value = {
      CreateTime: '',
      CreatorId: userInfo.UserName!,
      CreatorRealName: userInfo.RealName!,
      Tag: controlTagInfo.value.Tag,
      Action: controlTagInfo.value.action!,
      ControlValue: Number(controlTagInfo.value.ControlValue),
      Remark: '',
    };
  } else {
    controlCrtState.value = '0';
    controlModalOpen.value = false;
    resetControlTagInfo();
    execLogs.value = [];
    logType.value = 'rt';
  }
});

watch(logType, async (t) => {
  if (t === 'rt') {

  } else {
    const { Data } = await getOperateLog({
      Tag: controlTagInfo.value.Tag,
      St: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      Et: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      Page: 1,
      Limit: 20,
    });
    if (Data) {
      operateLogData.value = Data.logInfos.reverse();
    }
  }
});
</script>

<template>
  <a-modal
    v-model:open="controlModalOpen"
    title="遥控操作"
    :footer="null"
    :mask-closable="false"
    @cancel="operDialogClosed"
    width="650px"
  >
    <div class="w-full h-full p-3 bg-ant.bg-container">
      <a-form :label-col="{ span: 4 }">
        <a-form-item label="场站名称" name="SName" class="">
          <a-input :value="controlTagInfo.SName" disabled class="display-input" />
        </a-form-item>
        <a-form-item label="设备名称" name="EqName" class="">
          <a-input :value="controlTagInfo.EqName" disabled class="display-input" />
        </a-form-item>
        <a-form-item label="控制点描述" name="Des" class="">
          <a-input :value="controlTagInfo.Des" disabled class="display-input" />
        </a-form-item>
        <a-form-item label="当前状态" name="currentState" class="">
          <a-input :value="currentState" disabled class="display-input" />
        </a-form-item>
        <a-form-item label="控制指令" name="Action" class="">
          <a-input :value="controlTagInfo.action" disabled />
          <!--          <a-input :value="operForm.Action" disabled class="w-[calc(100%-88px)]" />-->
          <!--          <a-button type="primary" size="middle" class="wf-button">五防规则</a-button>-->
        </a-form-item>
        <!--        <a-form-item label="遥控调度编号" name="index" class="form-input-item">-->
        <!--          <a-input v-model:value="operForm.index" placeholder="输入调度编号" class="number-input" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="是否跳过五防" name="skipWf" class="form-radio-item">-->
        <!--          <a-radio-group v-model:value="operForm.skipWf" button-style="solid" class="skip-wf-radio-group">-->
        <!--            <a-radio :value="true" class="skip-wf-radio">是</a-radio>-->
        <!--            <a-radio :value="false" class="skip-wf-radio">否</a-radio>-->
        <!--          </a-radio-group>-->
        <!--        </a-form-item>-->
      </a-form>
      <div class="w-full flex justify-center">
        <a-button class="w-200px" size="large" type="primary" @click="handleConfirm" :disabled="loading">执行</a-button>
      </div>
      <a-tabs v-model:activeKey="logType" size="small" type="card" class="mt-3">
        <a-tab-pane key="rt" tab="实时信息"></a-tab-pane>
        <a-tab-pane key="his" tab="历史信息"></a-tab-pane>
      </a-tabs>
      <a-table
        v-if="logType === 'rt'"
        :columns="controlRealTimeTableColumns"
        :data-source="execLogs"
        :pagination="false"
        size="small"
        rowKey="Time"
      >
        <template #bodyCell="{column, index, record }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <template v-else-if="column.dataIndex === 'State'">
            <div :class="[record.State === '成功'? 'result-success': 'result-failed']">
              {{ record.State }}
            </div>
          </template>
        </template>
      </a-table>
      <a-table
        v-else
        :columns="controlHistoricalTableColumns"
        :data-source="operateLogData"
        :pagination="false"
        size="small"
        rowKey="CreateTime"
      >
        <template #bodyCell="{column, index, record }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <template v-else-if="column.dataIndex === 'State'">
            <div :class="[record.State === '成功'? 'result-success': 'result-failed']">
              {{ record.State }}
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </a-modal>
  <ControlConfimModal v-model:open="confirmOpen" @exec="handleExec" />
</template>

<style lang="less" scoped>
:deep(.ant-tabs) {
  .ant-tabs-nav {
    margin-bottom: 0;
  }
}
</style>
