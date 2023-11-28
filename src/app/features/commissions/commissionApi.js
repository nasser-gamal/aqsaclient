import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const commissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommissions: builder.query({
      query: (params) => ({
        url: apiEndpoints.commission.GET_COMMISSIONS,
        params: { ...params },
      }),
      providesTags: ['commissions'],
    }),
    getLoggedUserCommissions: builder.query({
      query: (params) => ({
        url: apiEndpoints.LOGGED_USER_COMMISSIONS,
        params: { ...params },
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
  useGetCommissionsQuery,
  useGetLoggedUserCommissionsQuery,
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
  useDeleteCommissionMutation,
} = commissionApiSlice;
