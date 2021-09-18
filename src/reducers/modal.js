import { createReducer } from '@reduxjs/toolkit';
import { openModal, closeModal } from '../actions';

const initialState = {
  isOpened: false,
  type: null,
  extraData: null,
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(openModal, (state, { payload }) => {
    state.isOpened = true;
    state.type = payload.type;
    state.extraData = payload.extra || null;
  });
  builder.addCase(closeModal, (state) => {
    state.isOpened = false;
    state.type = null;
    state.extraData = null;
  });
});

export default modalReducer;
