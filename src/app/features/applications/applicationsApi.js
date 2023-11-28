import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const ApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllApps: builder.query({
      query: () => ({
        url: apiEndpoints.APPS,
      }),
      providesTags: ['apps'],
    }),
    createApp: builder.mutation({
      query: ({ form }) => ({
        url: apiEndpoints.APPS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['apps'],
    }),
    updateApp: builder.mutation({
      query: ({ appId, form }) => ({
        url: `${apiEndpoints.APPS}/${appId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['apps'],
    }),
    deleteApp: builder.mutation({
      query: (appId) => ({
        url: `${apiEndpoints.APPS}/${appId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['apps'],
    }),
  }),
});

export const {
  useFindAllAppsQuery,
  useCreateAppMutation,
  useUpdateAppMutation,
  useDeleteAppMutation,
} = ApplicationApiSlice;
