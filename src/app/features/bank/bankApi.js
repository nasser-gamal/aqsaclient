import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const bankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllBanks: builder.query({
      query: () => ({
        url: apiEndpoints.bank.GET_BANKS,
      }),
      providesTags: ['banks'],
    }),
    createBank: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.bank.CREATE_BANK,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['banks'],
    }),
    updateBank: builder.mutation({
      query: ({ bankId, form }) => ({
        url: `${apiEndpoints.bank.UPDATE_BANK}/${bankId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['banks'],
    }),
  }),
});

export const {
  useFindAllBanksQuery,
  useCreateBankMutation,
  useUpdateBankMutation,
} = bankApiSlice;
