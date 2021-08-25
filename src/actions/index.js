import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from 'routes';

// eslint-disable-next-line import/prefer-default-export
export const loadData = createAsyncThunk('fetchData', async (token) => {
  const route = routes.getData();
  const responce = await axios.get(route, { headers: { Authorization: `Bearer ${token}` } });
  return responce.data;
});
export const addMessage = createAction('ADD_MESSAGE');
export const changeChannel = createAction('CHANGE_CHANNEL');
export const openModal = createAction('OPEN_MODAL');
export const closeModal = createAction('CLOSE_MODAL');
export const addChannel = createAction('ADD_CHANNEL');
export const renameChannel = createAction('RENAME_CHANNEL');
export const deleteChannel = createAction('DELETE_CHANNEL');
