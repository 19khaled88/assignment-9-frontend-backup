import { IMeta, IUserResonse } from "@/types"
import { baseApi } from "./baseApi"

const AUTH_URL = '/user'
export const authApi = baseApi.injectEndpoints({
  
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        data: loginData
      }),
      invalidatesTags: ['User']
    }),

    allUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${AUTH_URL}/allUsers`,
        method: 'GET',
        params: arg
      }),
      transformErrorResponse: (response: IUserResonse, meta: IMeta) => {
        return {
          users: response,
          meta
        }
      },
      providesTags: ['User']
    }),

    userProfile: build.query({
      query: (id: string) => ({
        url: `${AUTH_URL}/single/${id}`,
        method: 'GET'
      }),
      providesTags:['User']
    }),


    userUpdate: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${AUTH_URL}/update/${id}`,
        method: 'PUT',
        data: payload
      }),
      invalidatesTags:['User']
    })
  }),
  //   overrideExisting: false,
})

export const { useUserLoginMutation, useAllUserQuery, useUserProfileQuery,useUserUpdateMutation } = authApi