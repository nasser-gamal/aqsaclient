import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const providerTreasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProviderTreasury: builder.query({
      query: () => ({
        url: apiEndpoints.providerTreasury.GET_PROVIDER_TREASURYS,
      }),
      providesTags: ['providerTreasury'],
    }),
    createProviderTreasury: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.providerTreasury.CREATE_PROVIDER_TREASURY,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['providerTreasury'],
    }),
    updateProviderTreasury: builder.mutation({
      query: ({ treasuryId, form }) => ({
        url: `${apiEndpoints.providerTreasury.UPDATE_PROVIDER_TREASURY}/${treasuryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['providerTreasury'],
    }),
    deleteProviderTreasury: builder.mutation({
      query: (treasuryId) => ({
        url: `${apiEndpoints.providerTreasury.DELETE_PROVIDER_TREASURY}/${treasuryId}`,
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
