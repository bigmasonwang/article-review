import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getArticles } from '../../services/articles';
import IArticlesQuery from '../../types/IArticlesQuery';

interface IArticle {
  date: number;
  url: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  source: string;
}

interface IFetchArticlesRes {
  articles: IArticle[];
  totalPages: number;
  curPage: number;
}

interface InitialState {
  articles: IArticle[];
  articlesTotalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
  articles: [],
  articlesTotalPages: 1,
  status: 'idle',
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (query: IArticlesQuery) => {
    const response = await getArticles(query);
    return response.data as IFetchArticlesRes;
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state: InitialState) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state: InitialState, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.articlesTotalPages = action.payload.totalPages;
      })
      .addCase(fetchArticles.rejected, (state: InitialState) => {
        state.status = 'failed';
      });
  },
});

export const selectArticles = (state: RootState) => state.articles.articles;
export const selectArticlesTotalPages = (state: RootState) =>
  state.articles.articlesTotalPages;

export default articleSlice.reducer;
