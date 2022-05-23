import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1/',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken
        headers.set('authorization', `Bearer ${accessToken}`)
        return headers
    },
})

export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
})