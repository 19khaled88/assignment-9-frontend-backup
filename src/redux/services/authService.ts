import { AuthTokenKey } from "@/constants/tokenKey"
import { decodedToken } from "@/utils/jwt"
import { getTokenFromLocalStorage, setToeknToLocalStorage } from "@/utils/localstorage"

export const storeUserInfo=({token}:{token:string})=>{
    setToeknToLocalStorage(AuthTokenKey,token)
}

export const getUserInfo=()=>{
   
    const authTokenFound = getTokenFromLocalStorage(AuthTokenKey)
    if(authTokenFound){
        const decodedData = decodedToken(authTokenFound)
        return decodedData
    }else{
        return ""
    }
}

export const isLoggedIn =()=>{
    const authTokenFound = getTokenFromLocalStorage(AuthTokenKey)

    return !!authTokenFound
}

export const removeUserInfo =(key:string)=>{
    return localStorage.removeItem(key)
}