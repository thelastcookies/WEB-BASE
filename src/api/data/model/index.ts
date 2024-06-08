import type {BaseResponseBody} from "@/api/data";
import type {BaseModel, ModelDelParam, ModelsResponseBody, Model} from "@/api/data/model/types";

export function getModels() {
    return useGet<ModelsResponseBody>(
        `${BASE_URL}/model`,
    );
}

export function addModel(model: BaseModel) {
    return usePost<BaseResponseBody>(
        `${BASE_URL}/model`,
        model,
    );
}

export function updModel(model: Model) {
    return usePut<BaseResponseBody>(
        `${BASE_URL}/model`,
        model,
    );
}

export function delModel(id: number) {
    return useDelete<BaseResponseBody>(
        `${BASE_URL}/model`, {
            model_id: id,
        } as ModelDelParam,
    );
}
