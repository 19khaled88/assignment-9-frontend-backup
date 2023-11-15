import { IMeta, ITurfResponse } from "@/types"
import { baseApi } from "./baseApi"

const FIELD_URL = '/field'
export const fieldApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createField: build.mutation({
      query: (fieldData) => ({
        url: `${FIELD_URL}/create`,
        method: 'POST',
        data: fieldData
      }),
      invalidatesTags: ['Fields']
    }),
    allFields: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${FIELD_URL}/allFields`,
        method: 'GET',
        params: arg
      }),
      transformErrorResponse: (response: ITurfResponse, meta: IMeta) => {
        return {
          fields: response,
          meta
        }
      },
      providesTags: ['Fields']
    }),
    fieldWithId: build.query({
      query: (id: string) => ({
        url: `${FIELD_URL}/single/${id}`,
        method: 'GET'
      }),
      providesTags: ['Fields']
    }),
    fieldWithTurfId:build.query({
      query: (id: string) => ({
        url: `${FIELD_URL}/singleTurfId/${id}`,
        method: 'GET'
      }),
      providesTags: ['Fields']
    }),
    deleteFieldfWithId: build.mutation({
      query: (id: string) => ({
        url: `${FIELD_URL}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Fields']
    }),
    editField: build.mutation({
      query: ({id, ...payload}) => ({
        url: `${FIELD_URL}/update/${id}`,
        method: 'PUT',
        data: payload
      }),
      invalidatesTags: ['Fields']
    }),
  })
})

export const { useAllFieldsQuery, useFieldWithIdQuery, useCreateFieldMutation, useDeleteFieldfWithIdMutation,useEditFieldMutation,useFieldWithTurfIdQuery,useLazyFieldWithIdQuery } = fieldApi