import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  getArticles,
  postArticleTranslation,
  postComment,
} from '../../services/articles';
import IArticle from '../../types/IArticle';
import IArticleComment from '../../types/IArticleComment';
import IArticleEditInfo from '../../types/IArticleEditInfo';
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
  fetchArticlesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  editArticleStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  addCommentStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
  articles: [],
  articlesCollection:
    (JSON.parse(localStorageGet('articles')) as IArticle[]) || [],
  articlesTotalPages: 1,
  fetchArticlesStatus: 'idle',
  editArticleStatus: 'idle',
  addCommentStatus: 'idle',
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (query: IArticlesQuery) => {
    const response = await getArticles(query);
    return response.data as IFetchArticlesRes;
  }
);

export const editArticle = createAsyncThunk(
  'articles/editArticle',
  async (info: IArticleEditInfo) => {
    const response = await postArticleTranslation(info);
    return response.data as IArticle;
  }
);

export const addComment = createAsyncThunk(
  'articles/addComment',
  async (comment: IArticleComment) => {
    const response = await postComment(comment);
    return response.data as IArticle;
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    /**
     * Add an article to an array
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
        state.fetchArticlesStatus = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state: InitialState, action) => {
        state.fetchArticlesStatus = 'succeeded';
        state.articles = action.payload.articles;
        state.articlesTotalPages = action.payload.totalPages;
      })
      .addCase(fetchArticles.rejected, (state: InitialState) => {
        state.fetchArticlesStatus = 'failed';
      })
      .addCase(editArticle.pending, (state: InitialState) => {
        state.editArticleStatus = 'loading';
      })
      .addCase(editArticle.fulfilled, (state: InitialState, action) => {
        state.editArticleStatus = 'succeeded';
        const newArticle = action.payload;
        const existingPost = state.articles.find(
          (article) => article._id === newArticle._id
        );
        if (existingPost) {
          existingPost.content_en = newArticle.content_en;
          existingPost.title_en = newArticle.title_en;
        }
        // collection - localstorage
        let articles = JSON.parse(localStorageGet('articles')) as IArticle[];
        articles = articles.map((a) =>
          a._id === newArticle._id ? newArticle : a
        );
        localStoragePut('articles', articles);
        state.articlesCollection = articles;
      })
      .addCase(editArticle.rejected, (state: InitialState) => {
        state.editArticleStatus = 'failed';
      })
      .addCase(addComment.pending, (state: InitialState) => {
        state.addCommentStatus = 'loading';
      })
      .addCase(addComment.fulfilled, (state: InitialState, action) => {
        state.addCommentStatus = 'succeeded';
        const newArticle = action.payload;
        const existingPost = state.articles.find(
          (article) => article._id === newArticle._id
        );
        if (existingPost) {
          existingPost.content_en = newArticle.content_en;
          existingPost.title_en = newArticle.title_en;
        }
        // collection - localstorage
        let articles = JSON.parse(localStorageGet('articles')) as IArticle[];
        articles = articles.map((a) =>
          a._id === newArticle._id ? newArticle : a
        );
        localStoragePut('articles', articles);
        state.articlesCollection = articles;
      })
      .addCase(addComment.rejected, (state: InitialState) => {
        state.addCommentStatus = 'failed';
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
