import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRequestFavorites } from "../../models/redux/favorites";

interface IInitialState {
  items: any;
  loading: boolean;
}

const initialState: IInitialState = {
  items: null,
  loading: false,
};

const proxyUrl: string = "https://startup-summer-2023-proxy.onrender.com/2.0";
const client_secret: string =
  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

export const addToFavorite = createAsyncThunk<IRequestFavorites, number>(
  "favorites/addFavorite",
  async (vacancyID: number) => {
    const url: string = `${proxyUrl}/favorites/${vacancyID}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": `${client_secret}`,
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await res.json();
    return result;
  }
);

export const removeFavorite = createAsyncThunk<Promise<Response>, number>(
  "favorites/removeFavorite",
  async (vacancyID: number) => {
    const url: string = `${proxyUrl}/favorites/${vacancyID}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": `${client_secret}`,
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await res;
    return result;
  }
);

export const fetchFavorites = createAsyncThunk<IRequestFavorites>(
  "favorites/fetchFavorites",
  async () => {
    const url: string = `${proxyUrl}/favorites/`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": `${client_secret}`,
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await res.json();
    return result;
  }
);

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addToFavorite.fulfilled, (state) => {
        // localStorage.setItem("favorites", JSON.stringify(state.items));
        return state;
      })
      .addCase(removeFavorite.fulfilled, (state) => {
        // localStorage.setItem("favorites", JSON.stringify(state.items));
        return state;
      })
      .addCase(fetchFavorites.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
        // localStorage.setItem("favorites", JSON.stringify(state.items));
        // return {
        //   ...state,
        //   items: localStorage.getItem("favorites"),
        //   loading: false,
        // };
        return {
          ...state,
          items: payload.objects,
          loading: false,
        };
      });
  },
});

export const {} = favouritesSlice.actions;
export default favouritesSlice.reducer;
