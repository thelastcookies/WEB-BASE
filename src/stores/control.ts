export const useControlStore = defineStore('control', () => {
  const controlModalOpen = ref<boolean>(false);
  const controlCrtState = ref('0');
  const controlTagInfo = ref<ControlTagInfoRecordExt>({
    Tag: '',
    Des: '',
    ControlType: '',
    ControlValue: '',
    ChannelNo: '',
    ChannelIP: '',
    ChannelPort: 0,
    MeoAdd: '',
    SId: '',
    SName: '',
    EqId: '',
    EqName: '',
    EqType: '',
    Status: '',
    action: '',
  });
  const execLogs = ref<RealTimeLog[]>([]);

  const resetControlTagInfo = () => {
    controlTagInfo.value = {
      Tag: '',
      Des: '',
      ControlType: '',
      ControlValue: '',
      ChannelNo: '',
      ChannelIP: '',
      ChannelPort: 0,
      MeoAdd: '',
      SId: '',
      SName: '',
      EqId: '',
      EqName: '',
      EqType: '',
      Status: '',
      action: '',
    };
  };

  return {
    controlModalOpen,
    controlCrtState,
    controlTagInfo,
    execLogs,
    resetControlTagInfo,
  };
});
