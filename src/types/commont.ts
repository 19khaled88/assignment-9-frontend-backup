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

export type IGenericErrorMessage = {
    path: string;
    message: string
}

export type IUserResonse = {
    id: string,
    name: string,
    role: string,
    email: string,
    contactNo: string,
    address: string,
    location: string,
    bookings: string[]
}

export type IBookingResponse = {
    start_time: string,
    end_time: string,
    payment_status: string,
    gameOfferId: string,
    userId: string,
    turfId: string,
    fieldId: string,
    gameTypeId: string
}

export type IGameTypeResponse = {
    id: string,
    name: string,
    numberOfPalyers: number,
    GameOffers: string
    bookings: string
}

export type ITurfResponse = {
    id: string,
    name: string,
    location: string,
    owner: string,
    gameOffers: string[],
    fields: string[],
    bookings: string[],
}

export type IOfferResponse ={
    price_per_hour:number,
    turfId:string,
    turf:string[],
    gameTypeId:string,
    gameType:string[],
    fieldId:string,
    field:string[],
    bookings:string[]
}