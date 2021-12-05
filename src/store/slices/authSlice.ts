import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  get as storageGet,
  put as storagePut,
  clearLocalStorage,
} from '../../utils/localStorage';
import type { RootState } from '../index';

// Define a type for the slice state
interface AuthState {
  userName: string | null;
  email: string | null;
  token: string | null;
}

const storedToken: string | null = JSON.parse(storageGet('token'));
const storedUserName: string | null = JSON.parse(storageGet('userName'));
const storedEmail: string | null = JSON.parse(storageGet('email'));

// Define the initial state using that type
const initialState: AuthState = {
  userName: storedUserName,
  email: storedEmail,
  token: storedToken,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { token, userName, email },
      }: PayloadAction<{ token: string; userName: string; email: string }>
    ) => {
      storagePut('token', token);
      storagePut('userName', userName);
      storagePut('email', email);
      state.userName = userName;
      state.email = email;
      state.token = token;
    },
    removeCredentials: (state) => {
      clearLocalStorage();
      state.userName = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = slice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserName = (state: RootState) => state.auth.userName;

export default slice.reducer;
