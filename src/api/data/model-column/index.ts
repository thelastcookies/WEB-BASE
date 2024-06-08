import type {BaseResponseBody} from "@/api/data";
import type {Column, ColumnWithAction, ModelColumnResponseBody} from "@/api/data/model-column/types";

export function getModelColumn(modelId: number) {
    return useGet<ModelColumnResponseBody>(
        `${BASE_URL}/model/${modelId}`,
    );
}

export function addModelColumn(modelId: number, columns: Column[]) {
    return usePost<BaseResponseBody>(
        `${BASE_URL}/model/${modelId}`,
        {columns},
    );
}

export function updModelColumn(modelId: number, columns: ColumnWithAction[]) {
    return usePut<BaseResponseBody>(
        `${BASE_URL}/model/${modelId}`,
        {columns},
    );
}

export function delModelColumn(modelId: number) {
    return useDelete<BaseResponseBody>(
        `${BASE_URL}/model/${modelId}`,
    );
}
