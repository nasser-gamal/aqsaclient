import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const providerCommissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProviderCommissions: builder.query({
      query: ({ page, limit, fields, sort, keyword, conditions }) => ({
        url: `${apiEndpoints.PROVIDER_COMMISSIONS}?page=${page}&limit=${limit}&fields=${fields}&sort=${sort}&keyword=${keyword}&${conditions}`,
      }),
      providesTags: ['providerCommission'],
    }),
    createProviderCommission: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.PROVIDER_COMMISSIONS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['providerCommission'],
    }),
    updateProviderCommission: builder.mutation({
      query: ({ providerCommissionId, form }) => ({
        url: `${apiEndpoints.PROVIDER_COMMISSIONS}/${providerCommissionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['providerCommission'],
    }),
    deleteProviderCommission: builder.mutation({
      query: (providerCommissionId) => ({
        url: `${apiEndpoints.PROVIDER_COMMISSIONS}/${providerCommissionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['providerCommission'],
    }),
  }),
});

export const {
  useFindAllProviderCommissionsQuery,
  useCreateProviderCommissionMutation,
  useUpdateProviderCommissionMutation,
  useDeleteProviderCommissionMutation,
} = providerCommissionApiSlice;
