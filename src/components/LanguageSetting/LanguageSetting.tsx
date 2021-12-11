import React from 'react';
import { FormControlLabel, Switch, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectShowEN, selectShowZH, setShowEN, setShowZH } from '../../store/slices/settingSlice';

const LanguageSetting = () => {
  const dispatch = useAppDispatch();
  const displayZHChecked = useAppSelector(selectShowZH)
  const displayENChecked = useAppSelector(selectShowEN)
  const handleDisplayZHChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setShowZH({ show: event.target.checked }));
  };
  const handleDisplayENChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setShowEN({ show: event.target.checked }));
  };
  return (
    <Box display="flex" justifyContent="flex-end">
      <FormControlLabel
        label="Show ZH"
        control={
          <Switch
            checked={displayZHChecked}
            onChange={handleDisplayZHChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
      />
      <FormControlLabel
        label="Show EN"
        control={
          <Switch
            checked={displayENChecked}
            onChange={handleDisplayENChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
      />
    </Box>
  );
};

export default LanguageSetting;
