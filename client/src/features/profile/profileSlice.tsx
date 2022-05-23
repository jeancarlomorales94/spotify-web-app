import { spotifyApi } from '../api/apiSlice';

interface Profile {
    display_name: string;
}
const extendedApiSlice = spotifyApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, void>({
            query: () => '/me',
        }),
    }),
});

export const { useGetProfileQuery } = extendedApiSlice;
