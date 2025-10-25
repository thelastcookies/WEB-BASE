// 获取汇流箱基本信息与数据
export const getCombinerBaseInfo = (data: GetCombinerBaseInfoRequestBody) => {
  return usePost<AdminResponseBody<CombinerRecord[]>, GetCombinerBaseInfoRequestBody>(
    `${ADMIN_URL}/Combiner/GetBaseInfo`,
    data,
  );
};

// 获取汇流箱基本信息与数据（根据汇流箱编号）
export const getCombinerBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<CombinerRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Combiner/GetBaseInfoById`,
    data,
  );
};

// 获取汇流箱基本信息与数据（根据场站编号）
export const getCombinerBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<CombinerRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Combiner/GetBaseInfoBySId`,
    data,
  );
};

// 获取汇流箱测点列表（根据汇流箱编号）
export const getCombinerPointInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Combiner/GetPointInfoById`,
    data,
  );
};
