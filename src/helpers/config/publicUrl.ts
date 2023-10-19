export const getBaseUrl = (): string => {
    return process.env.BACKEND_PUBLIC_URL || "http://localhost:3039/api/v1"
    
}