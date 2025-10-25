// 获取箱变（子阵、光伏区、虚拟箱变等）基本信息与数据
export const getTransformerBaseInfo = (data: GetTransformerBaseInfoRequestBody) => {
  return usePost<AdminResponseBody<TransformerRecord[]>, GetTransformerBaseInfoRequestBody>(
    `${ADMIN_URL}/Transformer/GetBaseInfo`,
    data,
  );
};

// 获取箱变基本信息与数据（根据箱变编号）
export const getTransformerBaseInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<TransformerRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Transformer/GetBaseInfoById`,
    data,
  );
};

// 获取箱变基本信息与数据（根据场站编号）
export const getTransformerBaseInfoBySId = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<TransformerRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Transformer/GetBaseInfoBySId`,
    data,
  );
};

// 获取箱变测点列表（根据箱变编号）
export const getTransformerPointInfoById = (data: GetDataByIdRequestBody) => {
  return usePost<AdminResponseBody<PointInfoRecord[]>, GetDataByIdRequestBody>(
    `${ADMIN_URL}/Transformer/GetPointInfoById`,
    data,
  );
};
