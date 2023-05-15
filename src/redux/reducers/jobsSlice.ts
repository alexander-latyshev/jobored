import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRequestJobs, IVacancy } from "../../models/redux/jobs";

interface IInitialState {
  vacancies: IVacancy[] | null;
  loading: boolean;
  favorites: IVacancy[];
}

const initialState: IInitialState = {
  vacancies: null,
  loading: false,
  favorites: JSON.parse(localStorage.getItem("favorites") || "{}"),
};

const proxyUrl: string = "https://startup-summer-2023-proxy.onrender.com/2.0/";
const client_secret: string =
  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

export const fetchJobs = createAsyncThunk<IRequestJobs, number>(
  "jobs/fetchJobs",
  async (page: number) => {
    const url: string = `${proxyUrl}vacancies/?count=4&page=${page}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "applicati0on/json",
          "x-secret-key": "GEU4nvd3rej*jeh.eqp",
          "X-Api-App-Id": `${client_secret}`,
        },
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addNewFavorite: (state, { payload }: PayloadAction<IVacancy>) => {
      state.favorites.push(payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, { payload }: PayloadAction<IVacancy>) => {
      const filteredFavorites = state.favorites.filter((fav) => {
        return fav.id !== payload.id;
      });
      state.favorites = filteredFavorites;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJobs.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        const { objects } = action.payload;
        return {
          ...state,
          vacancies: objects,
          loading: false,
        };
      });
  },
});

export const { addNewFavorite, removeFavorite } = jobsSlice.actions;
export default jobsSlice.reducer;
