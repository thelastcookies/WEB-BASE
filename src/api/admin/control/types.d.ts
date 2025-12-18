export interface GetControlTagInfoRequestBody {
  Tag?: string;
  EqId?: string;
}

export interface ControlTagInfoRecord {
  Tag: string;
  Des: string;
  ControlType: string;
  ControlValue: string;
  ChannelNo: string;
  ChannelIP: string;
  ChannelPort: number;
  MeoAdd: string;
  SId: string;
  SName: string;
  EqId: string;
  EqName: string;
  EqType: string;
  Status: string;
}

export interface ControlTagInfoRecordExt extends ControlTagInfoRecord {
  action?: string;
}

export interface ExecControlRequestBody {
  CreateTime: string;
  CreatorId: string;
  CreatorRealName: string;
  Tag: string;
  Action: string;
  ControlValue: number;
  Remark: string;
}

export interface OperatorRecord {
  CreatorId: string;
  CreatorRealName: string;
  Tag: string;
  Des: string;
  Action: string;
  UserName: string;
  Password: string;
}

export interface GetOperateLogRequestBody {
  St: string;
  Et: string;
  Tag: string;
  SIds?: string;
  EqIds?: string;
  EqType?: string;
  Page: number;
  Limit: number;
}

export interface HistoryLogResponseBody {
  logCount: number;
  logInfos: HistoryLogRecord[];
}

export interface HistoryLogRecord {
  CreateTime: string;
  Action: string;
  LogContent: string;
  State: string;
  SName: string;
}
