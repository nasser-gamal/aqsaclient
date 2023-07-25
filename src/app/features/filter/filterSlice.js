import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: 10,
  searchBy: '',
  searchValue: '',
  orderBy: 'createdAt',
  sort: 'DESC',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    resetFilter: () => {
      return {
        limit: 10,
        page: 1,
        orderBy: 'createdAt',
        searchBy: '',
        searchValue: '',
        sort: 'DESC',
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
  resetFilter,
  navigatePage,
  changeLimit,
  searchInput,
  clearInput,
  sortData,
} = filterSlice.actions;
