import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: '',
  searchBy: '',
  searchValue: '',
  orderBy: 'createdAt',
  sort: 'DESC',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    oldData: (state, action) => {
      return {
        limit: action.payload.limit,
        page: action.payload.page,
        orderBy: action.payload.orderBy,
        searchBy: action.payload.searchBy,
        searchValue: action.payload.searchValue,
        sort: action.payload.sort,
      };
    },
    navigatePage: (state, action) => {
      return { ...state, page: action.payload };
    },
    changeLimit: (state, action) => {
      return { ...state, limit: action.payload };
    },
    searchInput: (state, action) => {
      return {
        ...state,
        searchBy: action.payload.searchBy,
        searchValue: action.payload.searchValue,
      };
    },
    clearInput: (state) => {
      return { ...state, searchBy: '', searchValue: '' };
    },
    sortData: (state, action) => {
      return {
        ...state,
        orderBy: action.payload.orderBy,
        sort: action.payload.sort,
      };
    },
  },
});

export default filterSlice.reducer;
export const {
  oldData,
  navigatePage,
  changeLimit,
  searchInput,
  clearInput,
  sortData,
} = filterSlice.actions;
