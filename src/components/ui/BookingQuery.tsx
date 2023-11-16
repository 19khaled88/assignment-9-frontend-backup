import { useSomeBookingsQuery } from '@/redux/api/bookingApi'
import React from 'react'

const BookingQuery = (id:string) => {
    const { data: someBookings,isLoading:someBookingLoading } = useSomeBookingsQuery(id)
  return {someBookings,someBookingLoading}
}

export default BookingQuery