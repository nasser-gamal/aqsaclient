import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

import sidebarReducer from './features/sidebar/sidebarSlice';
import modalReducer from './features/modal/modalSlice';
import loaderReducer from './features/loader/loaderSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    modal: modalReducer,
    loader: loaderReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
