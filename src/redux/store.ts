import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import jobsSlice from "./reducers/jobsSlice";
import jobSlice from "./reducers/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobsSlice,
    currentJob: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
