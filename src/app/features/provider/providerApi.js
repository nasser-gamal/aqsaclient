import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const providerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProviders: builder.query({
      query: (params) => ({
        url: apiEndpoints.PROVIDERS,
        params: { ...params },
      }),
      providesTags: ['provider'],
    }),
    createProvider: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.PROVIDERS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['provider'],
    }),
    updateProvider: builder.mutation({
      query: ({ providerId, form }) => ({
        url: `${apiEndpoints.PROVIDERS}/${providerId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['provider'],
    }),
    deleteProvider: builder.mutation({
      query: (providerId) => ({
        url: `${apiEndpoints.PROVIDERS}/${providerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['provider'],
    }),
  }),
});

export const {
  useFindAllProvidersQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
} = providerApiSlice;
