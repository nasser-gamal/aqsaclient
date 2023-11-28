import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const segmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllSegment: builder.query({
      query: (params) => ({
        url: apiEndpoints.SEGMENTS,
        params: { ...params },
      }),
      providesTags: ['segments'],
    }),
    createSegment: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.SEGMENTS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['segments'],
    }),
    updateSegment: builder.mutation({
      query: ({ segmentId, form }) => ({
        url: `${apiEndpoints.SEGMENTS}/${segmentId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['segments'],
    }),
    deleteSegment: builder.mutation({
      query: (segmentId) => ({
        url: `${apiEndpoints.SEGMENTS}/${segmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['segments'],
    }),
  }),
});

export const {
  useFindAllSegmentQuery,
  useCreateSegmentMutation,
  useUpdateSegmentMutation,
  useDeleteSegmentMutation,
} = segmentApiSlice;
