import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tableReducer from './store/reducers/tableReducer';
import chartReducer from './store/reducers/chartReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    chart: chartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
