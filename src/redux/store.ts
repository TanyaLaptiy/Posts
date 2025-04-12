import { configureStore } from '@reduxjs/toolkit';
import filterReduser from './slices/filterSlice';
import postReduser from './slices/postSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter: filterReduser, post: postReduser },
});

export type RootState= ReturnType<typeof store.getState>;

export type AppDispatch=typeof store.dispatch
export const useAppDispatch=()=>useDispatch<AppDispatch>()