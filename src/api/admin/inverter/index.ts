// 获取逆变器基本信息与数据
export const getInverterBaseInfo = (data: GetInverterBaseInfoRequestBody) => {
  return usePost<AdminResponseBody<InverterRecord[]>, GetInverterBaseInfoRequestBody>(
    `${ADMIN_URL}/Inverter/GetBaseInfo`,
    data,
  );
};

// 获取逆变器基本信息与数据（根据逆变器编号）
export const getInverterBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<InverterRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Inverter/GetBaseInfoById`,
    data,
  );
};

// 获取逆变器基本信息与数据（根据场站编号）
export const getInverterBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<InverterRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Inverter/GetBaseInfoBySId`,
    data,
  );
};

// 获取逆变器测点列表
export const getInverterPointInfo = (data: GetPointInfoRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetPointInfoRequestBody>(
    `${ADMIN_URL}/Inverter/GetPointInfo`,
    data,
  );
};

// 获取逆变器测点列表（根据逆变器编号）
export const getInverterPointInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Inverter/GetPointInfoById`,
    data,
  );
};

// 获取逆变器测点历史值(区间数据)
export const getInverterPointInterp = (data: GetPointInterpRequestBody) => {
  return usePost<AdminResponseBody<ValueResponseBody>, GetPointInterpRequestBody>(
    `${ADMIN_URL}/Inverter/GetPointInterp`,
    data,
  );
};

// 获取逆变器状态信息
export const getInverterStateInfo = (data: GetInverterStateInfoRequestBody) => {
  return usePost<AdminResponseBody<InverterStateRecord[]>, GetInverterStateInfoRequestBody>(
    `${ADMIN_URL}/Inverter/GetStateInfo`,
    data,
  );
};
