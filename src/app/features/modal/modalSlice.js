import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalTitle: null,
  isOpen: false,
  componentName: null,
  innerProps: null,
  status: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalTitle = action.payload.modalTitle;
      state.componentName = action.payload.name;
      state.innerProps = action.payload.innerProps;
      state.status = action.payload.status;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalTitle = null;
      state.componentName = null;
      state.innerProps = null;
      state.status = null;
    },
    updateFormState: (state, action) => {
      // Update the form state with the payload data
      state.innerProps = action.payload;
    },
  },
});

export const { openModal, closeModal, updateFormState } = modalSlice.actions;
export default modalSlice.reducer;
