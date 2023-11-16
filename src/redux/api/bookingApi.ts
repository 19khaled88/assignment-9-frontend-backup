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
                    bookings: response,
                    meta
                }
            },
            providesTags: ['Bookings']
        }),
        someBookings: build.query({
            query: (userId:string) => ({
                url: `${BOOKING_URL}/bookingsById/${userId}`,
                method: 'GET'
            }),
            transformErrorResponse: (response: IBookingResponse, meta: IMeta) => {
                return {
                    bookings: response,
                    meta
                }
            },
            providesTags: ['Bookings']
        }),
        bookingsWithId: build.query({
            query: (id: string) => ({
              url: `${BOOKING_URL}/single/${id}`,
              method: 'GET'
            }),
            providesTags: ['Bookings']
          }),
        editBookingStatus: build.mutation({
            query: ({id, ...payload}) => ({
              url: `${BOOKING_URL}/update/${id}`,
              method: 'PUT',
              data: payload
            }),
            invalidatesTags: ['Bookings']
          }),
          deleteBooking: build.mutation({
            query: (id:string) => ({
              url: `${BOOKING_URL}/delete/${id}`,
              method: 'DELETE'
            }),
            invalidatesTags: ['Bookings']
          }),
    })
})

export const { useAllBookingsQuery,useCreateBookingMutation,useBookingsWithIdQuery,useSomeBookingsQuery,useEditBookingStatusMutation,useDeleteBookingMutation } = bookingApi