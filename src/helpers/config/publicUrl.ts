const pub_url = 'https://assignment-9-frontend-backup.vercel.app//api/v1'
// const pub_url = 'https://assignment-9-backend.vercel.app/api/v1/'
export const getBaseUrl = (): string => {
    // return process.env.BACKEND_PUBLIC_URL || "http://localhost:3039/api/v1"
    return pub_url || "http://localhost:3039/api/v1"
    // return "https://assignment-9-backend.vercel.app/api/v1"
    // return "http://localhost:3039/api/v1"

}