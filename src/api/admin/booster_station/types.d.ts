export type GetBoosterStationBaseInfoRequestBody =
  GetDataByIdRequestBody
  | GetDataByStationIdRequestBody
  | GetDataRealtimeRequestBody;

export interface BoosterStationRecord {
  Id: string;
  Name: string;
  SId: string;
  // 三相电流
  Ia: string;
  Ib: string;
  Ic: string;
  // 三相电压
  Uab: string;
  Ubc: string;
  Uca: string;
  // 有功功率
  P: string;
  // 无功功率
  Q: string;
}

export interface BoosterStationPointInfoRecord extends PointInfoRecord {
  System?: '';
}
