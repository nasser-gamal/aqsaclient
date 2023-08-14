import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const duesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllDues: builder.query({
      query: ({ page, limit, order, sort }) => ({
        url: `${apiEndpoints.dues.GET_DUES}?page=${page}&limit=${limit}&order=${order}&sort=${sort}`,
      }),
      providesTags: ['Dues'],
    }),
    createDues: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.dues.CREATE_DUE,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['Dues'],
    }),
    updateDues: builder.mutation({
      query: ({ dueId, form }) => ({
        url: `${apiEndpoints.dues.UPDATE_DUE}/${dueId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['Dues'],
    }),
    deleteDues: builder.mutation({
      query: (dueId) => ({
        url: `${apiEndpoints.dues.DELETE_DUE}/${dueId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dues'],
    }),
  }),
});

export const {
  useFindAllDuesQuery,
  useCreateDuesMutation,
  useUpdateDuesMutation,
  useDeleteDuesMutation,
} = duesApiSlice;
