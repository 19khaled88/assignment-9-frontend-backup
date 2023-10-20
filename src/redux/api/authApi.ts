import { IMeta, IUserResonse } from "@/types"
import { baseApi } from "./baseApi"

const AUTH_URL = '/user'
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url:`${AUTH_URL}/signin`,
        method:'POST',
        data:loginData
      }),
      invalidatesTags:['user']
    }),


    allUser: build.query({
      query: (arg:Record<string,any>) => ({
        url:`${AUTH_URL}/allUsers`,
        method:'GET',
        params:arg
      }),
      transformErrorResponse:(response:IUserResonse, meta:IMeta)=>{
        return{
          users:response,
          meta
        }
      },
      providesTags:['user']
    }),

    userProfile: build.query({
      query: (id:string) => ({
        url:`${AUTH_URL}/single/${id}`,
        method:'GET'
        
      })
      
    }),
  }),
//   overrideExisting: false,
})

export const { useUserLoginMutation,useAllUserQuery, useUserProfileQuery} = authApi