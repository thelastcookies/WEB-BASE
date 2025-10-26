// 获取风机基本信息与数据
export const getFanBaseInfo = (data: GetFanBaseInfoRequestBody) => {
  return usePost<AdminResponseBody<FanRecord[]>, GetFanBaseInfoRequestBody>(
    `${ADMIN_URL}/Fan/GetBaseInfo`,
    data,
  );
};

// 获取风机基本信息与数据（根据风机编号）
export const getFanBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<FanRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Fan/GetBaseInfoById`,
    data,
  );
};

// 获取风机基本信息与数据（根据场站编号）
export const getFanBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<FanRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Fan/GetBaseInfoBySId`,
    data,
  );
};

// 获取风机测点列表
export const getFanPointInfo = (data: GetPointInfoRequestBody) => {
  return usePost<AdminResponseBody<FanPointInfoRecord[]>, GetPointInfoRequestBody>(
    `${ADMIN_URL}/Fan/GetPointInfo`,
    data,
  );
};

// 获取风机测点列表（根据风机编号）
export const getFanPointInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<FanPointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Fan/GetPointInfoById`,
    data,
  );
};

// 获取风机测点历史值(区间数据)
export const getFanPointInterp = (data: GetPointInterpRequestBody) => {
  return usePost<AdminResponseBody<ValueResponseBody>, GetPointInterpRequestBody>(
    `${ADMIN_URL}/Fan/GetPointInterp`,
    data,
  );
};
