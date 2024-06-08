import type {BaseResponseBody} from "@/api/data";
import type {BaseView, ViewsResponseBody, View} from "@/api/data/view/types";

export function getViews() {
    return useGet<ViewsResponseBody>(
        `${BASE_URL}/view`,
    );
}

export function addView(view: BaseView) {
    return usePost<BaseResponseBody>(
        `${BASE_URL}/view`,
        view,
    );
}

export function updView(view: View) {
    return usePut<BaseResponseBody>(
        `${BASE_URL}/view`,
        view,
    );
}

export function delView(id: number) {
    return useDelete<BaseResponseBody>(
        `${BASE_URL}/view/${id}`,
    );
}
