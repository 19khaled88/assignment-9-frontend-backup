import { IBookingResponse, IMeta } from "@/types"
import { baseApi } from "./baseApi"

const BOOKING_URL = '/booking'
export const bookingApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        allBookings:build.query({
            query:(arg: Record<string, any>)=>({
                url:`${BOOKING_URL}/allBookings`,
                method:'GET',
                params:arg
            }),
            transformErrorResponse: (response: IBookingResponse, meta: IMeta) => {
                return {
                  users: response,
                  meta
                }
              },
              providesTags: ['Bookings']
        })
    })
})

export const { useAllBookingsQuery } = bookingApi