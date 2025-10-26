// 获取场站基本信息与数据（根据场站编号）
export const getStationBaseInfo = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<StationRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Station/GetBaseInfo`,
    data,
  );
};

// 获取场站测点列表（根据场站编号）
export const getStationPointInfo = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<StationPointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Station/GetPointInfo`,
    data,
  );
};

// 获取场站测点历史值(区间数据)
export const getStationPointInterp = (data: GetPointInterpRequestBody) => {
  return usePost<AdminResponseBody<ValueResponseBody>, GetPointInterpRequestBody>(
    `${ADMIN_URL}/Station/GetPointInterp`,
    data,
  );
};

// 获取场站电量
export const getStationElectronic = (data: GetStationElectronicRequestBody) => {
  return usePost<AdminResponseBody<GetStationPlanRequestBody>, GetStationElectronicRequestBody>(
    `${ADMIN_URL}/Station/GetElectronic`,
    data,
  );
};

// 获取场站线路
export const getStationLine = (data: GetStationLineRequestBody) => {
  return usePost<AdminResponseBody<StationLineRecord[]>, GetStationLineRequestBody>(
    `${ADMIN_URL}/Station/GetLine`,
    data,
  );
};

// 获取场站损失电量
export const getStationLossDL = (data: GetStationLossRequestBody) => {
  return usePost<AdminResponseBody<StationLossRecord[]>, GetStationLossRequestBody>(
    `${ADMIN_URL}/Station/GetLossDL`,
    data,
  );
};

// 获取场站计划电量
export const getStationPlan = (data: GetStationPlanRequestBody) => {
  return usePost<AdminResponseBody<StationPlanRecord[]>, GetStationPlanRequestBody>(
    `${ADMIN_URL}/Station/GetPlanDL`,
    data,
  );
};
