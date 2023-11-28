import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const feesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFees: builder.query({
      query: (params) => ({
        url: apiEndpoints.FEES,
        params: { ...params },
      }),
      providesTags: ['fees'],
    }),
    createFee: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.FEES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['fees'],
    }),
    updateFee: builder.mutation({
      query: ({ feesId, form }) => ({
        url: `${apiEndpoints.FEES}/${feesId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['fees'],
    }),
    deleteFee: builder.mutation({
      query: (feesId) => ({
        url: `${apiEndpoints.FEES}/${feesId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fees'],
    }),
  }),
});

export const {
  useGetFeesQuery,
  useCreateFeeMutation,
  useUpdateFeeMutation,
  useDeleteFeeMutation,
} = feesApiSlice;
