import { IMeta, IOfferResponse } from "@/types"
import { baseApi } from "./baseApi"

const BOOKING_URL = '/game-offer'
export const offerfApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        allOffers:build.query({
            query:(arg: Record<string, any>)=>({
                url:`${BOOKING_URL}/allOfferdGames`,
                method:'GET',
                params:arg
            }),
            transformErrorResponse: (response: IOfferResponse, meta: IMeta) => {
                return {
                  offers: response,
                  meta
                }
              }
            
        })
    })
})

export const { useAllOffersQuery } = offerfApi