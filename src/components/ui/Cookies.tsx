'use server'
 
import { cookies } from 'next/headers'
 
async function CookiesCreate(data:any) {
//   cookies().set('name', 'lee')
//   // or
//   cookies().set('name', 'lee', { secure: true })
//   // or
  cookies().set({
    name: 'turfBookingCookie',
    value: data,
    httpOnly: true,
    
  })
}

export default CookiesCreate