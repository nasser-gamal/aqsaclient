import apiEndpoints from '../../../utils/endPoints';
import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (form) => ({
        url: apiEndpoints.auth.LOGIN,
        method: 'POST',
        body: form,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: apiEndpoints.auth.LOGOUT,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
