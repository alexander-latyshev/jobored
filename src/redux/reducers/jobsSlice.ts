import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormOptions, IRequestJobs, IVacancy } from "../../models/redux/jobs";
import {
  CLIENT_SECRET,
  COUNT_PAGE_ITEMS,
  PROXY_URL,
  X_SECRET_KEY,
} from "../../consts";
import { tokens } from "../../consts";
import { ICatalogue } from "../../models/redux/catalogues";
import getQueryParams from "../../helpers/queryParams";

interface IInitialState {
  vacancies: IVacancy[] | null;
  totalPages: number;
  loading: boolean;
  favorites: IVacancy[];
  formOptions: IFormOptions;
  catalogues: ICatalogue[];
}

export const initialForm: IFormOptions = {
  industry: "",
  keyword: "",
  payment_from: undefined,
  payment_to: undefined,
};

const initialState: IInitialState = {
  vacancies: null,
  totalPages: 0,
  loading: false,
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  catalogues: [],
  formOptions: initialForm,
};

export const fetchJobs = createAsyncThunk<
  IRequestJobs,
  { formOptions: IFormOptions; page: number }
>("jobs/fetchJobs", async ({ formOptions, page }) => {
  const params = getQueryParams(formOptions);
  const url: string =
    `${PROXY_URL}/vacancies/?published=1&count=${COUNT_PAGE_ITEMS}&page=${page}` +
    `${params ? `&${params}` : ""}`;

  if (tokens?.access_token) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": `${X_SECRET_KEY}`,
          "X-Api-App-Id": `${CLIENT_SECRET}`,
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
});

export const fetchCatalogues = createAsyncThunk<Array<ICatalogue>>(
  "jobs/fetchCatalogues",
  async () => {
    const url: string = `${PROXY_URL}/catalogues/`;
    if (tokens?.access_token) {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-secret-key": `${X_SECRET_KEY}`,
            "X-Api-App-Id": `${CLIENT_SECRET}`,
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });
        const result = await res.json();
        return result;
      } catch (e) {
        console.log(e);
      }
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
    setFormOptions: (state, { payload }: PayloadAction<IFormOptions>) => {
      return { ...state, formOptions: payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, { payload }: PayloadAction<IRequestJobs>) => {
          const { objects, total } = payload;
          const totalPages = total > 125 ? 125 : total;

          return {
            ...state,
            vacancies: objects,
            loading: false,
            totalPages: totalPages,
          };
        }
      )
      .addCase(
        fetchCatalogues.fulfilled,
        (state, { payload }: PayloadAction<ICatalogue[]>) => {
          return { ...state, catalogues: payload };
        }
      );
  },
});

export const { addNewFavorite, removeFavorite, setFormOptions } =
  jobsSlice.actions;
export default jobsSlice.reducer;
