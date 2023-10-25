
import jwtDecode from 'jwt-decode'

export const decodedToken = (token:string):Record<string,string>=>{
    return jwtDecode(token)
}