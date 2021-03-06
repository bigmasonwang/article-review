import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './slices/articleSlice';
import authSlice from './slices/authSlice';
import settingSlice from './slices/settingSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    articles: articleSlice,
    auth: authSlice,
    setting: settingSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
