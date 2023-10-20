export interface IMeta {
    limit: number;
    page: number;
    size: number;
}

export type ResponseSuccessType = {
    data: any,
    meta?: IMeta
}
export type ResponseErrorType = {
    statusCode: number,
    message: string,
    errorMessages: IGenericErrorMessage[]
}

export type IGenericErrorMessage ={
    path:string;
    message:string
}

export type IUserResonse ={
    id: string,
    name: string,
    role: string,
    email: string,
    contactNo: string,
    address: string,
    location: string,
    bookings:string[]
}