import { AuthTokenKey } from "@/constants/tokenKey"
import { decodedToken } from "@/utils/jwt"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { getTokenFromLocalStorage, getTokenLocalStorage, setToeknToLocalStorage } from "@/utils/localstorage"

export const storeUserInfo = ({ token }: { token: string }) => {
    setToeknToLocalStorage(AuthTokenKey, token)
}
export const getUserInfo = () => {
    const authTokenFound = getTokenFromLocalStorage(AuthTokenKey)
    
    if (authTokenFound) {
        // const decodedData= jwt.verify(authTokenFound, process.env.ACCESS_TOKEN_KEY as Secret) as JwtPayload
        const decodedData = decodedToken(authTokenFound)
       
        return decodedData
    } else {
        return null
    }
}

export const getId=async()=>{
    const authToken =await getTokenLocalStorage(AuthTokenKey)
    
    if (authToken) {
        const decodedData = decodedToken(authToken)
        return decodedData
    } else {
        return null
    }
}

export const isLoggedIn = () => {
    const authTokenFound = getTokenFromLocalStorage(AuthTokenKey)

    return !!authTokenFound
}

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key)
}