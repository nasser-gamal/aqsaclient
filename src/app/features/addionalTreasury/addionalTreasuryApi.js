import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const addionalTreasuryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllAddionalTreasury: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.addionalTreasury.GET_ADDIONAL_TREASURYS}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['addionalTreasury'],
    }),
    createAddionalTreasury: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.addionalTreasury.CREATE_ADDIONAL_TREASURY,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['addionalTreasury'],
    }),
    updateAddionalTreasury: builder.mutation({
      query: ({ treasuryId, form }) => ({
        url: `${apiEndpoints.addionalTreasury.UPDATE_ADDIONAL_TREASURY}/${treasuryId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['addionalTreasury'],
    }),
    deleteAddionalTreasury: builder.mutation({
      query: (treasuryId) => ({
        url: `${apiEndpoints.addionalTreasury.DELETE_ADDIONAL_TREASURY}/${treasuryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['addionalTreasury'],
    }),
  }),
});

export const {
  useFindAllAddionalTreasuryQuery,
  useCreateAddionalTreasuryMutation,
  useUpdateAddionalTreasuryMutation,
  useDeleteAddionalTreasuryMutation,
} = addionalTreasuryApiSlice;
