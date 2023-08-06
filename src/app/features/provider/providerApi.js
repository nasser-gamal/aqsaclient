import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const providerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProviders: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.provider.GET_PROVIDERS}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['provider'],
    }),
    createProvider: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.provider.CREATE_PROVIDER,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['provider'],
    }),
    updateProvider: builder.mutation({
      query: ({ providerId, form }) => ({
        url: `${apiEndpoints.provider.UPDATE_PROVIDER}/${providerId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['provider'],
    }),
    deleteProvider: builder.mutation({
      query: (providerId) => ({
        url: `${apiEndpoints.provider.DELETE_PROVIDER}/${providerId}`,
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
