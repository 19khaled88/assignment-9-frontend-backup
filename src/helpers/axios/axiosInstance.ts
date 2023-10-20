import { AuthTokenKey } from "@/constants/tokenKey";
import { ResponseErrorType, ResponseSuccessType } from "@/types";
import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const instance = axios.create()
instance.defaults.headers.post['Content-Type']="application/json"
instance.defaults.headers['Accept'] = "application/json"
instance.defaults.timeout = 60000;

instance.interceptors.request.use(function (config){
    const token = getTokenFromLocalStorage(AuthTokenKey)
    if(token){
        config.headers.Authorization = token
    }
    return config
},function(error){
    return Promise.reject(error)
})
//@ts-ignore
instance.interceptors.response.use(function(response){

    const responseObject:ResponseSuccessType = {
        data:response?.data,
        meta:response?.data?.meta
    }
    return responseObject
},function(error){
    const responseObject:ResponseErrorType ={
        statusCode:error?.response?.data?.statusCode || 500,
        message:error?.response?.data?.message || 'Something went wrong',
        errorMessages:error?.response?.data?.message,
    }
    return responseObject
    // return Promise.reject(error)
})

export { instance };

