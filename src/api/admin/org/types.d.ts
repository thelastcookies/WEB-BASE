export interface SysOrgRecord {
  Id: string;
  Name: string;
  PId: string;
  Capacity?: number;
  Type?: '光伏' | '风电';
  Level: number;
  Order?: number;
  View?: '1' | '0';
  MisId?: string;
}
