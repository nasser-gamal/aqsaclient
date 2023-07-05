import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const commissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllCommissions: builder.query({
      query: ({ searchValue, agentId, year, month }) => ({
        url: `${apiEndpoints.commission.GET_COMMISSIONS}?search=${searchValue}&agentId=${agentId}&month=${month}&year=${year}`,
      }),
      providesTags: ['commissions'],
    }),
    createCommission: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.commission.CREATE_COMMISSION,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['commissions'],
    }),
    updateCommission: builder.mutation({
      query: ({ commissionId, form }) => ({
        url: `${apiEndpoints.commission.UPDATE_COMMISSION}/${commissionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['commissions'],
    }),
    deleteCommission: builder.mutation({
      query: (commissionId) => ({
        url: `${apiEndpoints.commission.DELETE_COMMISSION}/${commissionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['commissions'],
    }),
  }),
});

export const {
  useFindAllCommissionsQuery,
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
  useDeleteCommissionMutation,
} = commissionApiSlice;
