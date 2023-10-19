import { setToeknToLocalStorage } from "@/utils/localstorage"

export const storeUserInfo=({token}:{token:string})=>{
    setToeknToLocalStorage('validateToken',token)
}