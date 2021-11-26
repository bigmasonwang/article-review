import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getArticles } from '../../services/articles';
import IArticle from '../../types/IArticle';
import IArticlesQuery from '../../types/IArticlesQuery';
import {
  put as localStoragePut,
  get as localStorageGet,
} from '../../utils/localStorage';

interface IFetchArticlesRes {
  articles: IArticle[];
  totalPages: number;
  curPage: number;
}

interface InitialState {
  articles: IArticle[];
  articlesCollection: IArticle[];
  articlesTotalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
  articles: [],
  articlesCollection:
    (JSON.parse(localStorageGet('articles')) as IArticle[]) || [],
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
  reducers: {
    /**
     * Add an article to an array
     * @param state
     * @param action
     */
    addArticle(state, action: PayloadAction<IArticle>) {
      const article = action.payload;
      let articles = JSON.parse(localStorageGet('articles')) as IArticle[];
      if (!articles) {
        localStoragePut('articles', [article]);
        state.articlesCollection.push(article);
      } else if (!articles.some((a) => a._id === article._id)) {
        articles.push(article);
        state.articlesCollection = articles;
        localStoragePut('articles', articles);
      }
    },
    /**
     * Remove an article from the array
     * @param state
     * @param action
     */
    removeArticle(state, action: PayloadAction<IArticle>) {
      const article = action.payload;
      let articles = JSON.parse(localStorageGet('articles')) as IArticle[];
      articles = articles.filter((a) => a._id !== article._id);
      localStoragePut('articles', articles);
      state.articlesCollection = articles;
    },
  },
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

export const { addArticle, removeArticle } = articleSlice.actions;

/**
 * @description
 * Return fetched articles
 */
export const selectArticles = (state: RootState) => state.articles.articles;

/**
 * @description
 * Return fetched articles pages
 */
export const selectArticlesTotalPages = (state: RootState) =>
  state.articles.articlesTotalPages;

/**
 * @description
 * Return collected articles
 */
export const selectArticlesCollection = (state: RootState) =>
  state.articles.articlesCollection;

export default articleSlice.reducer;
