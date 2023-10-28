import { IGameTypeResponse, IMeta } from "@/types"
import { baseApi } from "./baseApi"

const BOOKING_URL = '/game-type'
export const gameTypeApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        allGameTypes:build.query({
            query:(arg: Record<string, any>)=>({
                url:`${BOOKING_URL}/allGameTypes`,
                method:'GET',
                params:arg
            }),
            transformErrorResponse: (response: IGameTypeResponse, meta: IMeta) => {
                return {
                  games: response,
                  meta
                }
              },
              providesTags: ['Gametypes']
        })
    })
})

export const { useAllGameTypesQuery } = gameTypeApi