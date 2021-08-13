import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from 'routes';

// eslint-disable-next-line import/prefer-default-export
export const loadData = createAsyncThunk('fetchData', async (token) => {
  const route = routes.getData();
  const responce = await axios.get(route, { headers: { Authorization: `Bearer ${token}` } });
  return responce.data;
});
