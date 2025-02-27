import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsState {
  allArticles: any[]; // original
  articles: any[]; // filtered
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  allArticles:[],
  articles:[],
  status: "idle",
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.status = "loading";
    },
    fetchNewsSuccess(state, action: PayloadAction<any[]>) {
      state.status = "succeeded";
      state.allArticles = action.payload;
      state.articles = action.payload;
    },
    fetchNewsFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    setArticles(state, action: PayloadAction<any[]>){
      state.articles = action.payload
    }
  },
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, setArticles } = newsSlice.actions;
export default newsSlice.reducer;
