import { IMeta, ITurfResponse } from "@/types"
import { baseApi } from "./baseApi"

const BOOKING_URL = '/turf'
export const turfApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        allTurfs:build.query({
            query:(arg: Record<string, any>)=>({
                url:`${BOOKING_URL}/allTurfs`,
                method:'GET',
                params:arg
            }),
            transformErrorResponse: (response: ITurfResponse, meta: IMeta) => {
                return {
                  turfs: response,
                  meta
                }
              },
              providesTags: ['Turfs']
        })
    })
})

export const { useAllTurfsQuery } = turfApi