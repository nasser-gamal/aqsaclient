import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllUsers: builder.query({
      query: (params) => ({
        url: `${apiEndpoints.USERS}`,
        params: { ...params },
      }),
      providesTags: ['users'],
    }),
    createUser: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.USERS,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['users'],
    }),
    updateUser: builder.mutation({
      query: ({ userId, form }) => ({
        url: `${apiEndpoints.USERS}/${userId}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['users'],
    }),
    updatePasswordManual: builder.mutation({
      query: ({ userId, password }) => ({
        url: `${apiEndpoints.USERS}/update-password-manual/${userId}`,
        method: 'PUT',
        body: { password },
      }),
      invalidatesTags: ['users'],
    }),
    updatePassword: builder.mutation({
      query: ({ userId, password }) => ({
        url: `${apiEndpoints.USERS}/update-password/${userId}`,
        method: 'PUT',
        body: { password },
      }),
      invalidatesTags: ['users'],
    }),
    updateUserStatus: builder.mutation({
      query: (userId) => ({
        url: `${apiEndpoints.USERS}/update-status/${userId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation({
      query: ({ id, password }) => ({
        url: `${apiEndpoints.USERS}/${id}`,
        method: 'DELETE',
        body: { password },
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export const {
  useFindAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useUpdatePasswordManualMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApiSlice;
