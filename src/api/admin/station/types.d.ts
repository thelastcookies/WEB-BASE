export interface StationRecord {
  Id: string;
  Name: string;
  Power: string;
  Irradiance?: string;
  WindSpeed?: string;
  Electronic: string;
  State: string;
  Temperature?: string;
  ElectronicM?: string;
  ElectronicY?: string;
}

export interface StationPointInfoRecord extends PointInfoRecord {
  System: '升压站' | '气象仪' | 'AVC' | 'AGC' | '电能表';
}

export interface GetStationElectronicRequestBody {
  Ids: string;
  // 时间格式: "YYYYMMDDHHMMSS-YYYYMMDDHHMMSS", 结束时间必须为次日/次月0点
  Time: string;
  Type: 'Day' | 'Month';
}

export interface GetStationLineRequestBody {
  Ids: string;
  SysType: string;
}

export interface StationLineRecord {
  SId: string;
  Line: string;
}

export interface GetStationLossRequestBody {
  Ids: string;
  Type?: 'Year' | 'Month';
  Date?: string;
}

export interface StationLossRecord {
  Id: string;
  Date?: null;
  Loss1: number;
  Loss2: number;
  Loss3: number;
  Loss4: number;
  Loss5: number;
  Loss6: number;
  LossTotal: number;
}

export interface GetStationPlanRequestBody {
  Type: 'Aggr' | 'Detail';
  Ids: string;
  Date: string;
}

export interface StationPlanRecord {
  Id: string;
  Date: string;
  PlanY: number;
  PlanM: number;
}
