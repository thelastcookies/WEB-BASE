// 获取电能表测点列表
export const getElectricityMeterPointInfo = (data: GetDataByStationIdRequestBody) => {
  return usePost<AdminResponseBody<ElectricityMeterPointInfoRecord[]>, GetDataByStationIdRequestBody>(
    `${ADMIN_URL}/ElectricMeter/GetPointInfo`,
    data,
  );
};
