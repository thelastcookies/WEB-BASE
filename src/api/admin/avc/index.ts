// 获取AVC基本信息与数据（根据AVC编号）
export const getAVCBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<AVCRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/AVC/GetBaseInfoById`,
    data,
  );
};

// 获取AVC基本信息与数据（根据场站编号）
export const getAVCBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<AVCRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/AVC/GetBaseInfoBySId`,
    data,
  );
};

// 获取AVC测点列表（根据AVC编号）
export const getAVCPointInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/AVC/GetPointInfoById`,
    data,
  );
};

// 获取AVC测点历史值(区间数据)
export const getAVCPointInterp = (data: GetPointInterpRequestBody) => {
  return usePost<AdminResponseBody<AVCPointInfoRecord[]>, GetPointInterpRequestBody>(
    `${ADMIN_URL}/AVC/GetPointInterp`,
    data,
  );
};
