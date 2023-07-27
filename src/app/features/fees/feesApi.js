import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const feesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllFees: builder.query({
      query: () => ({
        url: apiEndpoints.fees.GET_FEES,
      }),
      providesTags: ['fees'],
    }),
    createFee: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.fees.CREATE_FEE,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['fees'],
    }),
    updateFee: builder.mutation({
      query: ({ feesId, form }) => ({
        url: `${apiEndpoints.fees.UPDATE_FEE}/${feesId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['fees'],
    }),
    deleteFee: builder.mutation({
      query: (feesId) => ({
        url: `${apiEndpoints.fees.DELETE_FEE}/${feesId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fees'],
    }),
  }),
});

export const {
  useFindAllFeesQuery,
  useCreateFeeMutation,
  useUpdateFeeMutation,
  useDeleteFeeMutation,
} = feesApiSlice;
