export interface AdminResponseBody<T = any> {
  Success: boolean;
  ErrorCode: number;
  Data?: T;
  Msg: string;
}

export interface GetOptionRequestBody {
  selectedValues: string[];
  q?: string;
}

export interface RequestPagination {
  Page?: number;
  Limit?: number;
}

export interface GetDataByIdRequestBody {
  Ids?: string;
}

export interface GetDataByStationIdRequestBody {
  SIds?: string;
}

export interface GetDataByTransformerIdRequestBody {
  TIds?: string;
}

export interface GetDataByInverterIdRequestBody {
  IIds?: string;
}

export interface GetDataByLineRequestBody {
  Lines?: string;
}

export interface GetDataRealtimeRequestBody {
  RT?: '1' | '0';
}

export interface GetPointDataShowTypeRequestBody {
  ShowType?: string;
}

export type GetPointInfoRequestBody =
  GetDataByIdRequestBody
  | GetDataByStationIdRequestBody
  | GetPointDataShowTypeRequestBody;

export type GetPointInterpRequestBody = GetDataByIdRequestBody | {
  Index?: string;
  // 时间格式: "YYYYMMDDHHMMSS-YYYYMMDDHHMMSS"
  Time?: string;
  Interval?: number;
}

export interface PointInfoRecord {
  Id: string;
  Name: string;
  Tag: string;
  TagType: 'AI' | 'DI';
  Value: string;
  Unit: string;
  Order: string;
  ShowType: '列表' | '表格' | '仪表盘' | '光字牌';
}
