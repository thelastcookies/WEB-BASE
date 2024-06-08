import type {BaseResponseBody} from "@/api/data";

export interface Column {
    column_name: string;
    column_comment: string;
    data_type: string;
    data_length: string;
    data_precision: string;
    primary_key: boolean;
    is_unique: boolean;
    auto_increment: boolean;
}

export interface ColumnWithAction extends Column {
    column_action: "modify" | "add" | "delete";
}

export interface ModelColumnResponseBody extends BaseResponseBody {
    column_num: number;
    columns: Column[];
}
