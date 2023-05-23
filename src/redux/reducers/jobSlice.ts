import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRequestJob } from "../../models/redux/currentJob";
import { CLIENT_SECRET, PROXY_URL, X_SECRET_KEY, tokens } from "../../consts";

interface CounterState {
  vacancy: IRequestJob | null;
  loading: boolean;
}

const initialState: CounterState = {
  vacancy: null,
  loading: false,
};

export const fetchJob = createAsyncThunk<IRequestJob, string | undefined>(
  "job/fetchJob",
  async (jobID: string | undefined) => {
    const url: string = `${PROXY_URL}/vacancies/${jobID}`;
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

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(
        fetchJob.fulfilled,
        (state, { payload }: PayloadAction<IRequestJob>) => {
          return { ...state, vacancy: payload, loading: false };
        }
      );
  },
});

export const {} = jobSlice.actions;
export default jobSlice.reducer;
