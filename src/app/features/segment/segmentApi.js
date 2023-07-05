import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const segmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllSegment: builder.query({
      query: () => ({
        url: apiEndpoints.segment.GET_SEGMENTS,
      }),
      providesTags: ['segments'],
    }),
    createSegment: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.segment.CREATE_SEGMENT,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['segments'],
    }),
    updateSegment: builder.mutation({
      query: ({ segmentId, form }) => ({
        url: `${apiEndpoints.segment.UPDATE_SEGMENT}/${segmentId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['segments'],
    }),
    deleteSegment: builder.mutation({
      query: (segmentId) => ({
        url: `${apiEndpoints.segment.DELETE_SEGMENT}/${segmentId}`,
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
