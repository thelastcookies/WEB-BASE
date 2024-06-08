export interface BaseTimestamp {
    time_stamp: string;
}

export interface BaseResponseBody {
    result: boolean;
    errcode?: string;
    errmsg?: string;
}
