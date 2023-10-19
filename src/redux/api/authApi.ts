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
  }),
//   overrideExisting: false,
})

export const { useUserLoginMutation } = authApi