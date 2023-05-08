import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducer";

export const store = configureStore({
  reducer: dataSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
