// import { IMeta, IOfferResponse } from "@/types"
import { IMeta } from "@/types"
import { baseApi } from "./baseApi"

const OFFER_URL = '/game-offer'
export const offerfApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        createOffers: build.mutation({
            query: (offerdData) => ({
              url: `${OFFER_URL}/create`,
              method: 'POST',
              data: offerdData
            }),
            invalidatesTags: ['Offers']
          }),
        allOffers:build.query({
            query:(arg: Record<string, any>)=>({
                url:`${OFFER_URL}/allOfferdGames`,
                method:'GET',
                params:arg
            }),
            transformErrorResponse: (response: any, meta: IMeta) => {
                return {
                  offers: response,
                  meta
                }
              },
              providesTags:['Offers']
        }), 
        offerWithId: build.query({
            query: (id: string) => ({
              url: `${OFFER_URL}/single/${id}`,
              method: 'GET'
            }),
            providesTags: ['Offers']
          }),
          deleteOfferWithId: build.mutation({
            query: (id: string) => ({
              url: `${OFFER_URL}/delete/${id}`,
              method: 'DELETE'
            }),
            invalidatesTags: ['Offers']
          }),
          editOffer: build.mutation({
            query: ({id, ...payload}) => ({
              url: `${OFFER_URL}/update/${id}`,
              method: 'PUT',
              data: payload
            }),
            invalidatesTags: ['Offers']
          }),
    })
})

export const { useAllOffersQuery,useCreateOffersMutation,useEditOfferMutation,useDeleteOfferWithIdMutation,useOfferWithIdQuery } = offerfApi