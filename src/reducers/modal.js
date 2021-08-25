import { createReducer } from '@reduxjs/toolkit';
import { openModal, closeModal } from 'actions';

const initialState = {
  isOpened: false,
  type: 'addChannel',
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(openModal, (state, { payload }) => {
    state.isOpened = true;
    state.type = payload.type;
  });
  builder.addCase(closeModal, (state) => {
    state.isOpened = false;
    state.type = null;
  });
});

export default modalReducer;
