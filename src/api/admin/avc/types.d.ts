export interface AVCRecord {
  Id: string;
  Name: string;
  SId: string;
}

export interface AVCPointInfoRecord extends PointInfoRecord {
  LOrR?: 'L' | 'R';
}
