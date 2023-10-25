export const setToeknToLocalStorage = (key: string, token: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.setItem(key, token)
}
export const getTokenFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key)
}

export const getTokenLocalStorage = async (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    
    return localStorage.getItem(key)

}