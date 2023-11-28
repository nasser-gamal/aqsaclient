import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const addionalTreasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllAddionalTreasury: builder.query({
      query: ({ page, limit, fields, sort, keyword, conditions }) => ({
        url: `${apiEndpoints.ADDIONAL_TREASURIES}?page=${page}&limit=${limit}&fields=${fields}&sort=${sort}&keyword=${keyword}&${conditions}`,
      }),
      providesTags: ['addionalTreasuries'],
    }),
    createAddionalTreasury: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.ADDIONAL_TREASURIES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['addionalTreasuries'],
    }),
    updateAddionalTreasury: builder.mutation({
      query: ({ treasuryId, form }) => ({
        url: `${apiEndpoints.ADDIONAL_TREASURIES}/${treasuryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['addionalTreasuries'],
    }),
    deleteAddionalTreasury: builder.mutation({
      query: (treasuryId) => ({
        url: `${apiEndpoints.ADDIONAL_TREASURIES}/${treasuryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['addionalTreasuries'],
    }),
  }),
});

export const {
  useFindAllAddionalTreasuryQuery,
  useCreateAddionalTreasuryMutation,
  useUpdateAddionalTreasuryMutation,
  useDeleteAddionalTreasuryMutation,
} = addionalTreasuryApiSlice;
