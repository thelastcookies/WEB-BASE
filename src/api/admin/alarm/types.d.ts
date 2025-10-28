export interface AlarmRecord {
  Guid: string;
  EqId: string;
  SId: string;
  EqType: string;
  St: string;
  Et?: string;
  Des: string;
  SysType: '风电' | '光伏' | '功率控制' | '升压站' | '其他';
  Level: '提示' | '一般' | '严重';
}

export interface GetHstAlarmRequestBody extends RequestPagination {
  Ids: string;
  EqId: string;
  Soe: number;
  St: string; // YYYY-MM-DD HH:mm:ss
  Et: string; // 同上
  SysType: '风电' | '光伏' | '功率控制' | '升压站' | '其他';
  Level: '提示' | '一般' | '严重';
}

export interface HstAlarmRecord {
  alarmCount: string;
  alarmInfos: AlarmRecord[];
}

export interface SetAlarmConfirmRequestBody {
  Guid: string;
  Operator: string;
  Remark: string;
}
