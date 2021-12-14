import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  getAllUsers,
  getReceivedArticles,
  sendArticlesToUser,
} from '../../services/users';
import IArticle from '../../types/IArticle';

interface IUser {
  _id: string;
  userName: string;
}

interface InitialState {
  users: IUser[];
  receivedArticles: IArticle[];
  fetchReceivedArticlesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  sendArticlesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  fetchAllUsersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
  users: [],
  receivedArticles: [],
  fetchReceivedArticlesStatus: 'idle',
  sendArticlesStatus: 'idle',
  fetchAllUsersStatus: 'idle',
};

export const fetchReceivedArticles = createAsyncThunk(
  'user/fetchReceivedArticles',
  async () => {
    const response = await getReceivedArticles();
    return response.data as IArticle[];
  }
);

export const sendArticles = createAsyncThunk(
  'user/sendArticle',
  async (params: { sendToUserId: string; articleIds: string[] }) => {
    const response = await sendArticlesToUser(params);
    return response.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async () => {
    const response = await getAllUsers();
    return response.data as IUser[];
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivedArticles.pending, (state: InitialState) => {
        state.fetchReceivedArticlesStatus = 'loading';
      })
      .addCase(
        fetchReceivedArticles.fulfilled,
        (state: InitialState, action) => {
          state.fetchReceivedArticlesStatus = 'succeeded';
          state.receivedArticles = action.payload;
        }
      )
      .addCase(fetchReceivedArticles.rejected, (state: InitialState) => {
        state.fetchReceivedArticlesStatus = 'failed';
      })
      .addCase(sendArticles.pending, (state: InitialState) => {
        state.sendArticlesStatus = 'loading';
      })
      .addCase(sendArticles.fulfilled, (state: InitialState, action) => {
        state.sendArticlesStatus = 'succeeded';
      })
      .addCase(sendArticles.rejected, (state: InitialState) => {
        state.sendArticlesStatus = 'failed';
      })
      .addCase(fetchAllUsers.pending, (state: InitialState) => {
        state.fetchAllUsersStatus = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state: InitialState, action) => {
        state.fetchAllUsersStatus = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state: InitialState) => {
        state.fetchAllUsersStatus = 'failed';
      });
  },
});

// export const {} = userSlice.actions;

/**
 * @description
 * Return received articles
 */
export const selectReceivedArticles = (state: RootState) =>
  state.user.receivedArticles;

/**
 * @description
 * Return all users
 */
export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
