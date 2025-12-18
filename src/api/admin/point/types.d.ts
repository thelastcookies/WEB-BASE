export interface PointListResponseBody {
  points: PointItemInfo[];
  type: string[];
}

export interface PointItemInfo {
  Name: string;
  Tag: string;
  Type: string;
}
