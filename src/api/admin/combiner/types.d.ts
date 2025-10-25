export type GetCombinerBaseInfoRequestBody =
  GetDataByIdRequestBody
  | GetDataByStationIdRequestBody
  | GetDataByInverterIdRequestBody
  | GetDataByLineRequestBody
  | GetDataRealtimeRequestBody;

export interface CombinerRecord {
  Id: string;
  Name: string;
  SId: string;
  IId: string;
  Line: string;
  // 输入功率
  InPower: string;
  // 电压
  Voltage: string;
  // 电流
  Current: string;
  // 所属子阵
  Array: string;
}

