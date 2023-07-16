import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const withDrawApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllWithDraw: builder.query({
      query: () => ({
        url: apiEndpoints.withdraw.GET_WITHDRAWS,
      }),
      providesTags: ['withdraw'],
    }),
    createwithDraw: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.withdraw.CREATE_WITHDRAW,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['withdraw'],
    }),
    updateWithDraw: builder.mutation({
      query: ({ transactionId, form }) => ({
        url: `${apiEndpoints.withdraw.UPDATE_WITHDRAW}/${transactionId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['withdraw'],
    }),
  }),
});

export const {
  useFindAllWithDrawQuery,
  useCreatewithDrawMutation,
  useUpdateWithDrawMutation,
} = withDrawApiSlice;
