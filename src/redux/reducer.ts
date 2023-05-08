import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDataState {
  value: number;
}

const initialState: IDataState = {
  value: 0,
};

const proxyUrl = "https://startup-summer-2023-proxy.onrender.com/2.0/oauth2";
const login: string = "sergei.stralenia@gmail.com";
const password: string = "paralect123";
const client_id: string = "2356";
const client_secret: string =
  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

export const dataSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    increament: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { increament } = dataSlice.actions;

export default dataSlice.reducer;
