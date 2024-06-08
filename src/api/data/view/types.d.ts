import {BaseResponseBody} from "@/api/data";

export interface BaseView {
    view_name: string;
    view_full_name: string;
    view_type: number;
    view_status: number;
}

export interface View extends BaseView {
    view_id: number;
}

export interface ViewsResponseBody extends BaseResponseBody {
    rec_num: number;
    rec: View[];
}
