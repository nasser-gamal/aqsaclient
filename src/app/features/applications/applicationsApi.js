import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const ApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllApps: builder.query({
      query: () => ({
        url: apiEndpoints.applications.GET_APPS,
      }),
      providesTags: ['apps'],
    }),
    createApp: builder.mutation({
      query: ({ form }) => ({
        url: apiEndpoints.applications.CREATE_APP,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['apps'],
    }),
    updateApp: builder.mutation({
      query: ({ appId, form }) => ({
        url: `${apiEndpoints.applications.UPDATE_APP}/${appId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['apps'],
    }),
    deleteApp: builder.mutation({
      query: (appId) => ({
        url: `${apiEndpoints.applications.DELETE_APP}/${appId}`,
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
  useDeleteAppMutation
} = ApplicationApiSlice;
