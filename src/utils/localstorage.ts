export const setToeknToLocalStorage =(key:string,token:string)=>{
    if(!key || typeof window === 'undefined'){
        return ""
    }
    localStorage.setItem(key,token)
}