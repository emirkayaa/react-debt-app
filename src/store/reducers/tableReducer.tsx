import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { url } from '../../api';

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async (_, { getState }) => {
  const state = getState() as RootState;
  const token = localStorage.getItem('token') || state.auth.token;
  const response = await axios.get(url + 'finance/debt', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Gelen veriler:', response.data);
  return response.data.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log('Redux store verileri:', action.payload); // Redux store'a yerleştirilen verileri kontrol et
        if (Array.isArray(action.payload)) {
          state.loading = false;
          state.data = action.payload;
        } else {
          console.error('Hatalı veri formatı:', action.payload);
        }
      })      
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;
