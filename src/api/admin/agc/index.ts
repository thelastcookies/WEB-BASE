// 获取AGC基本信息与数据（根据AGC编号）
export const getAGCBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<AGCRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/AGC/GetBaseInfoById`,
    data,
  );
};

// 获取AGC基本信息与数据（根据场站编号）
export const getAGCBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<AGCRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/AGC/GetBaseInfoBySId`,
    data,
  );
};

// 获取AGC测点列表（根据AGC编号）
export const getAGCPointInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/AGC/GetPointInfoById`,
    data,
  );
};

// 获取AGC测点历史值(区间数据)
export const getAGCPointInterp = (data: GetPointInterpRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetPointInterpRequestBody>(
    `${ADMIN_URL}/AGC/GetPointInterp`,
    data,
  );
};
