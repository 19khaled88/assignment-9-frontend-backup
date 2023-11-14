import { IGameTypeResponse, IMeta } from "@/types"
import { baseApi } from "./baseApi"

const GAME_TYPE_URL = '/game-type'
export const gameTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createGameType: build.mutation({
      query: (gameTypeData) => ({
        url: `${GAME_TYPE_URL}/create`,
        method: 'POST',
        data: gameTypeData
      }),
      invalidatesTags: ['Gametypes']
    }),
    allGameTypes: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${GAME_TYPE_URL}/allGameTypes`,
        method: 'GET',
        params: arg
      }),
      transformErrorResponse: (response: IGameTypeResponse, meta: IMeta) => {
        return {
          games: response,
          meta
        }
      },
      providesTags: ['Gametypes']
    }),
    gameTypeWithId: build.query({
      query: (id: string) => ({
        url: `${GAME_TYPE_URL}/single/${id}`,
        method: 'GET'
      }),
      providesTags: ['Gametypes']
    }),
    deleteGameTypefWithId: build.mutation({
      query: (id: string) => ({
        url: `${GAME_TYPE_URL}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Gametypes']
    }),
    editGameType: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${GAME_TYPE_URL}/update/${id}`,
        method: 'PUT',
        data: payload
      }),
      invalidatesTags: ['Gametypes']
    }),
  })
})

export const { useAllGameTypesQuery, useGameTypeWithIdQuery, useCreateGameTypeMutation, useDeleteGameTypefWithIdMutation, useEditGameTypeMutation } = gameTypeApi