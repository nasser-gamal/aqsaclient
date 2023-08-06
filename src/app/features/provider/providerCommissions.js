import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const providerCommissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllProviderCommissions: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.providerCommission.GET_PROVIDER_COMMISSIONS}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['providerCommission'],
    }),
    createProviderCommission: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.providerCommission.CREATE_PROVIDER_COMMISSION,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['providerCommission'],
    }),
    updateProviderCommission: builder.mutation({
      query: ({ providerCommissionId, form }) => ({
        url: `${apiEndpoints.providerCommission.UPDATE_PROVIDER_COMMISSION}/${providerCommissionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['providerCommission'],
    }),
    deleteProviderCommission: builder.mutation({
      query: (providerCommissionId) => ({
        url: `${apiEndpoints.providerCommission.DELETE_PROVIDER_COMMISSION}/${providerCommissionId}`,
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
