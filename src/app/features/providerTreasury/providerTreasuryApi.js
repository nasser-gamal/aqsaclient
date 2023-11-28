import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const providerTreasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProviderTreasury: builder.query({
      query: (params) => ({
        url: apiEndpoints.PROVIDER_TREASURIES,
        params: { ...params },
      }),
      providesTags: ['providerTreasury'],
    }),
    createProviderTreasury: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.PROVIDER_TREASURIES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['providerTreasury'],
    }),
    updateProviderTreasury: builder.mutation({
      query: ({ treasuryId, form }) => ({
        url: `${apiEndpoints.PROVIDER_TREASURIES}/${treasuryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['providerTreasury'],
    }),
    deleteProviderTreasury: builder.mutation({
      query: (treasuryId) => ({
        url: `${apiEndpoints.PROVIDER_TREASURIES}/${treasuryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['providerTreasury'],
    }),
  }),
});

export const {
  useFindAllProviderTreasuryQuery,
  useCreateProviderTreasuryMutation,
  useUpdateProviderTreasuryMutation,
  useDeleteProviderTreasuryMutation,
} = providerTreasuryApiSlice;
