export type GetTransformerBaseInfoRequestBody =
  GetDataByIdRequestBody
  | GetDataByStationIdRequestBody
  | GetDataByLineRequestBody
  | GetDataRealtimeRequestBody;

export interface TransformerRecord {
  Id: string;
  Name: string;
  SId: string;
  Line: string;
  Type: string;
  Power: string;
  Temperature: string;
  // 虚拟箱变
  Virtual: string;
  // 三相电压
  Uab: string;
  Ubc: string;
  Uca: string;
  // 三相电流
  Ia: string;
  Ib: string;
  Ic: string;
  // 频率
  F: string;
  // 有功功率
  P: string;
  // 无功功率
  Q: string;
  // 功率因数
  Cos: string;
  // 高压侧开关
  HSwitchOn: string;
  // 接地开关
  GSwitchOn: string;
  // 低压侧开关
  LSwitchOn1: string;
  LSwitchOn2: string;
}
