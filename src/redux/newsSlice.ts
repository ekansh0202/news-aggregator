import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsState {
  allArticles: any[]; // all the articles combined - original
  articles: any[]; // all the articles combined - filtered - used to display the data

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  sourceType: string | null;
}

const initialState: NewsState = {
  allArticles: [],
  articles: [],

  status: "idle",
  error: null,
  sourceType: "all",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.status = "loading";
    },
    fetchNewsuccess(state, action: PayloadAction<any[]>) {
      state.status = "succeeded";
      const flattenedArticles = action.payload.flat();
      state.allArticles = flattenedArticles;
      state.articles = flattenedArticles;
    },
    fetchNewsFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchNewForSource(state, action: PayloadAction<any[]>) {
      state.status = "succeeded";
      state.allArticles = action.payload;
      state.articles = action.payload;
    },
    setArticles(state, action: PayloadAction<any[]>) {
      state.articles = action.payload;
    },
    setArticlesWithDate(state, action: PayloadAction<any[]>) {
      state.articles = action.payload;
    },
    setSourceType(state, action: PayloadAction<string>) {
      state.sourceType = action.payload;
    },
  },
});

// export const { fetchNewsStart, fetchNewsFromNewsAPISuccess, fetchNewsFromGuardianAPISuccess, fetchNewsFailure, setArticles } = newsSlice.actions;
export const {
  fetchNewsStart,
  fetchNewsuccess,
  fetchNewsFailure,
  fetchNewForSource,
  setArticles,
  setArticlesWithDate,
  setSourceType,
} = newsSlice.actions;
export default newsSlice.reducer;
