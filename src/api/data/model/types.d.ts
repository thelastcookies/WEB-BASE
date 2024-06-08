import type {BaseResponseBody} from "@/api/data";

export interface BaseModel {
    model_name: string;
    model_full_name: string;
    model_status: number | boolean;
    model_remark: string;
}

export interface Model extends BaseModel {
    model_id: number;
}

export interface ModelsResponseBody extends BaseResponseBody {
    rec_num: number;
    rec: Model[];
}

export interface ModelDelParam {
    model_id: number;
}
