// 获取控制测点信息
export const getControlTagInfo = (data: GetControlTagInfoRequestBody) => {
  return usePost<AdminResponseBody<ControlTagInfoRecord[]>, GetControlTagInfoRequestBody>(
    `${ADMIN_URL}/Control/GetTagInfo`,
    data,
  );
};

// 控制下发
export const execControl = (data: ExecControlRequestBody) => {
  return usePost<AdminResponseBody<CombinerRecord[]>, ExecControlRequestBody>(
    `${ADMIN_URL}/Control/Exec`,
    data,
  );
};

// 操作验证
export const setOperatorVerify = (data: OperatorRecord) => {
  return usePost<AdminResponseBody, OperatorRecord>(
    `${ADMIN_URL}/Control/OperatorVerify`,
    data,
  );
};

// 监护人验证
export const setGuardianVerify = (data: OperatorRecord) => {
  return usePost<AdminResponseBody, OperatorRecord>(
    `${ADMIN_URL}/Control/GuardianVerify`,
    data,
  );
};

// 操作日志
export const getOperateLog = (data: GetOperateLogRequestBody) => {
  return usePost<AdminResponseBody<HistoryLogResponseBody>, GetOperateLogRequestBody>(
    `${ADMIN_URL}/Control/OperateLog`,
    data,
  );
};



