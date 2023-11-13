import { IMeta, ITurfResponse } from "@/types"
import { baseApi } from "./baseApi"

const TURF_URL = '/turf'
export const turfApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTurf: build.mutation({
      query: (turfData) => ({
        url: `${TURF_URL}/create`,
        method: 'POST',
        data: turfData
      }),
      invalidatesTags: ['Turfs']
    }),
    allTurfs: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${TURF_URL}/allTurfs`,
        method: 'GET',
        params: arg
      }),
      transformErrorResponse: (response: ITurfResponse, meta: IMeta) => {
        return {
          turfs: response,
          meta
        }
      },
      providesTags: ['Turfs']
    }),
    turfWithId: build.query({
      query: (id: string) => ({
        url: `${TURF_URL}/single/${id}`,
        method: 'GET'
      }),
      providesTags: ['Turfs']
    }),
    deleteTurfWithId: build.mutation({
      query: (id: string) => ({
        url: `${TURF_URL}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Turfs']
    }),
    editTurf: build.mutation({
      query: ({id, ...payload}) => ({
        url: `${TURF_URL}/update/${id}`,
        method: 'PUT',
        data: payload
      }),
      invalidatesTags: ['Turfs']
    }),
  })
})

export const { useAllTurfsQuery, useTurfWithIdQuery, useCreateTurfMutation, useDeleteTurfWithIdMutation,useEditTurfMutation } = turfApi