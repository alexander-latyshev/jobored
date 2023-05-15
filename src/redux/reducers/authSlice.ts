import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRequestAuth } from "../../models/redux/auth";

interface IInitialState {}

const initialState: IInitialState = {};

type ITokens = {
  access_token: string;
  refresh_token: string;
};

const proxyUrl: string =
  "https://startup-summer-2023-proxy.onrender.com/2.0/oauth2";
const login: string = "sergei.stralenia@gmail.com";
const password: string = "paralect123";
const client_id: string = "2356";
const client_secret: string =
  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

export const passwordAuth = createAsyncThunk<IRequestAuth>(
  "auth/passwordAuth",
  async () => {
    const url: string = `${proxyUrl}/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": `${client_secret}`,
      },
    });

    const result = await res.json();
    const tokens: ITokens = {
      access_token: await result.access_token,
      refresh_token: await result.refresh_token,
    };

    localStorage.setItem("tokens", JSON.stringify(tokens));
    return result;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(passwordAuth.fulfilled, (state) => {
      return state;
    });
  },
});

export const {} = authSlice;
export default authSlice.reducer;
