// 获取升压站基本信息与数据
export const getBoosterStationBaseInfo = (data: GetBoosterStationBaseInfoRequestBody) => {
  return usePost<AdminResponseBody<BoosterStationRecord[]>, GetBoosterStationBaseInfoRequestBody>(
    `${ADMIN_URL}/BoosterStation/GetBaseInfo`,
    data,
  );
};

// 获取升压站基本信息与数据（根据升压站编号）
export const getBoosterStationBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<BoosterStationRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/BoosterStation/GetBaseInfoById`,
    data,
  );
};

// 获取升压站基本信息与数据（根据场站编号）
export const getBoosterStationBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<BoosterStationRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/BoosterStation/GetBaseInfoBySId`,
    data,
  );
};

// 获取升压站测点列表
export const getBoosterStationPointInfo = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<BoosterStationPointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/BoosterStation/GetPointInfo`,
    data,
  );
};
