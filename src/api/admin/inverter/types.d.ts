export type GetInverterBaseInfoRequestBody =
  GetDataByIdRequestBody
  | GetDataByStationIdRequestBody
  | GetDataByTransformerIdRequestBody
  | GetDataByLineRequestBody
  | GetDataRealtimeRequestBody;

export type GetInverterStateInfoRequestBody = GetDataByStationIdRequestBody | GetDataByTransformerIdRequestBody;

export interface InverterRecord {
  Id: string;
  Name: string;
  Power: string;
  RPower: string;
  Electronic: string;
  Line: string;
  SId: string;
  Standard?: '1' | '';
  State: string;
  TId: string;
  Type?: string;
}

export interface InverterStateRecord {
  SId: string;
  TId: string;
  state0: number;
  state1: number;
  state2: number;
  state3: number;
}
