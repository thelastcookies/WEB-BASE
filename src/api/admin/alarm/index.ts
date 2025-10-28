// 获取实时告警
export const getAlarmReal = () => {
  return useGet<AdminResponseBody<AlarmRecord[]>>(
    `${ADMIN_URL}/Alarm/GetReal`,
  );
};

// 获取历史告警
export const getAlarmHist = (data: GetHstAlarmRequestBody) => {
  return usePost<AdminResponseBody<HstAlarmRecord[]>, GetHstAlarmRequestBody>(
    `${ADMIN_URL}/Alarm/GetHst`,
    data,
  );
};

// 告警确认
export const setAlarmConfirm = (data: SetAlarmConfirmRequestBody) => {
  return usePost<AdminResponseBody, SetAlarmConfirmRequestBody>(
    `${ADMIN_URL}/Alarm/Confirm`,
    data,
  );
};
