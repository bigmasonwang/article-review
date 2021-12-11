import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get as storageGet, put as storagePut } from '../../utils/localStorage';
import type { RootState } from '../index';

// Define a type for the slice state
interface ISettingState {
  showZH: boolean;
  showEN: boolean;
}

const storedShowZH: boolean = JSON.parse(storageGet('showZH'));
const storedShowEN: boolean = JSON.parse(storageGet('showEN'));

// Define the initial state using that type
const initialState: ISettingState = {
  showZH: storedShowZH,
  showEN: storedShowEN,
};

export const slice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setShowZH: (
      state,
      { payload: { show } }: PayloadAction<{ show: boolean }>
    ) => {
      storagePut('showZH', show);
      state.showZH = show;
    },
    setShowEN: (
      state,
      { payload: { show } }: PayloadAction<{ show: boolean }>
    ) => {
      storagePut('showEN', show);
      state.showEN = show;
    },
  },
});

export const { setShowZH, setShowEN } = slice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShowZH = (state: RootState) => state.setting.showZH;
export const selectShowEN = (state: RootState) => state.setting.showEN;

export default slice.reducer;
