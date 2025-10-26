export type GetFanBaseInfoRequestBody =
  GetDataByIdRequestBody
  | GetDataByStationIdRequestBody
  | GetDataByLineRequestBody
  | GetDataRealtimeRequestBody;

export interface FanRecord {
  Id: string;
  Name: string;
  SId: string;
  Line: string;
  Type: string;
  Standard?: '1' | '0';
  Power: string;
  Electronic: string;
  State: string;
  WindS: string;
}

export interface FanPointInfoRecord extends PointInfoRecord {
  System?: '变桨' | '机舱' | '传动' | '电气' | '电网' | '主要信息' | '变流系统' | '发电机' | '叶轮' | '冷却系统' | '电网信息' | '变桨系统' | '风机变压器' | '偏航信息' | '通用' | '变流器' | '偏航' | '风轮' | '其他' | '齿轮箱' | '气象' | '液压系统' | '常用信息' | '天气' | '发电机温度' | '机舱振动加加速度' | '齿轮箱温度' | '环境温度' | '水冷' | '偏航系统';
}
