import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

const ArticleFilter = () => {
  const [dateFrom, setDateFrom] = useState<Date | null>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState<Date | null>(new Date(Date.now()));

  const handleDateFromChange = (newValue: Date | null) => {
    setDateFrom(newValue);
  };

  const handleDateToChange = (newValue: Date | null) => {
    setDateFrom(newValue);
  };

  return (
    <Box>
      <Typography variant="h5">Time Range</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date From"
            inputFormat="dd/MM/yyyy"
            value={dateFrom}
            onChange={handleDateFromChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="Date To"
            inputFormat="dd/MM/yyyy"
            value={dateTo}
            onChange={handleDateToChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};

export default ArticleFilter;
