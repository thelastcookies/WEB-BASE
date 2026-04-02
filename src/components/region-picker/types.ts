export interface RegionOption {
  label: string;
  value: string;
  isMunicipality?: boolean;
  children?: RegionOption[];
}

export interface RegionData {
  provinces: RegionOption[];
}

export type RegionValue = string;
