import { IBookingResponse, IMeta } from "@/types"
import { baseApi } from "./baseApi"

const BOOKING_URL = '/booking'
export const bookingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBooking: build.mutation({
            query: (bookingData) => ({
                url: `${BOOKING_URL}/create`,
                method: 'POST',
                data: bookingData
            }),
            invalidatesTags: ['Bookings']
        }),
        allBookings: build.query({
            query: (arg: Record<string, any>) => ({
                url: `${BOOKING_URL}/allBookings`,
                method: 'GET',
                params: arg
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

export const { useAllBookingsQuery,useCreateBookingMutation } = bookingApi