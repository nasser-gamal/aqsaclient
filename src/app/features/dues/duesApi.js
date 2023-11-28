import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const duesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllDues: builder.query({
      query: ({ page, limit, fields, sort, keyword, conditions }) => ({
        url: `${apiEndpoints.DUES}?page=${page}&limit=${limit}&fields=${fields}&sort=${sort}&keyword=${keyword}&${conditions}`,
      }),
      providesTags: ['Dues'],
    }),
    createDues: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.DUES,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['Dues'],
    }),
    updateDues: builder.mutation({
      query: ({ dueId, form }) => ({
        url: `${apiEndpoints.DUES}/${dueId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['Dues'],
    }),
    deleteDues: builder.mutation({
      query: (dueId) => ({
        url: `${apiEndpoints.DUES}/${dueId}`,
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
