import type { Dayjs } from 'dayjs';
import type { HisDataType } from '@/enums';

export interface BaseResponseBody<T = any> {
  code: number;
  msg: string;
  data: ? T;
}

export interface TagsRequestBody {
  tags: string;
}

export interface ValueResponseBody {
  values: string;
}

export interface TagTimeRequestBody extends TagsRequestBody {
  time: string;
  interval: number;
}

export interface DescResponseBody {
  [key: string]: {
    description: string;
    time: string;
    val: string;
  };
}

export interface HisTagParams {
  tags: string,
  st: Dayjs,
  ed?: Dayjs,
  interval?: number,
  type?: HisDataType,
  decimal?: number
}
