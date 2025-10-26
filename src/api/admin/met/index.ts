// 获取气象仪测点列表
export const getMeteorologyPointInfo = (data: GetDataByStationIdRequestBody) => {
  return usePost<AdminResponseBody<MeteorologyPointInfoRecord[]>, GetDataByStationIdRequestBody>(
    `${ADMIN_URL}/Meteorology/GetPointInfo`,
    data,
  );
};
