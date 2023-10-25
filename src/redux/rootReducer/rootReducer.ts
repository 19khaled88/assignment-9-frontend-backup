import { baseApi } from "../api/baseApi"
// import { reducerPath, reducer } from "../api/apiAuth"
export const rootReducer = {
    [baseApi.reducerPath]: baseApi.reducer
    // [reducerPath]: reducer
}

