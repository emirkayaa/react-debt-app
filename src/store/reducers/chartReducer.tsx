
    import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
    import axios from "axios";
    import { RootState } from "../../store";
    import { url } from "../../api";

    const initialState = {
        data: [],
        status: "idle",
        error: '',
    }

    export const chartDatas =  createAsyncThunk('data/fetchData', async (_, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        const response = await axios.get(url + 'finance/debt', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Gelen veriler:', response.data);
        return response.data.data;
      });

    const chartSlice = createSlice({
        name: 'chart',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(chartDatas.pending, (state) => {
                state.status = 'loading';
            });
            builder.addCase(chartDatas.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            });
            builder.addCase(chartDatas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message  || '';
            });
        }
    })

    export default chartSlice.reducer;