import React, { useState } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  TextField,
  Typography,
  Stack,
  Box,
  Divider,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import articleSources from '../../../constants/articleSources';
import IArticlesQuery from '../../../types/IArticlesQuery';

const ArticleFilter: React.FC<{ query: IArticlesQuery; setQuery: any }> = ({
  query,
  setQuery,
}) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState<Date | null>(new Date(Date.now()));
  const [source, setSource] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleDateFromChange = (newValue: Date | null) => {
    setDateFrom(newValue);
    let _dateFrom = '';
    if (dateFrom) {
      _dateFrom = `${dateFrom.getFullYear()}${(
        '0' +
        (dateFrom.getMonth() + 1)
      ).slice(-2)}${('0' + dateFrom.getDate()).slice(-2)}`;
    }
    setQuery({
      ...query,
      dateFrom: _dateFrom,
    });
  };

  const handleDateToChange = (newValue: Date | null) => {
    setDateTo(newValue);
    let _dateTo = '';
    if (dateTo) {
      _dateTo = `${dateTo.getFullYear()}${('0' + (dateTo.getMonth() + 1)).slice(
        -2
      )}${('0' + dateTo.getDate()).slice(-2)}`;
    }
    setQuery({
      ...query,
      dateTo: _dateTo,
    });
  };

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSource(event.target.value);
    setQuery({
      ...query,
      source: event.target.value,
    });
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setQuery({
      ...query,
      keyword: event.target.value,
    });
  };

  const handleReset = () => {
    setSource('');
    setKeyword('');
    setQuery({
      ...query,
      source: '',
      keyword: '',
    });
  };

  const handleSearch = () => {
    console.log(query);
  };

  return (
    <Box>
      <Typography variant="h5">Time Range</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={4}>
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
      <Divider sx={{ m: 2 }} />

      <Typography variant="h5">Source</Typography>
      <FormControl size="small" fullWidth>
        <InputLabel id="location-selector">Select City</InputLabel>
        <Select
          label="Select Source"
          id="source-selector"
          value={source}
          onChange={handleSourceChange}
          size="medium"
        >
          {articleSources.map((source) => (
            <MenuItem value={source} key={source}>
              {source}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider sx={{ m: 2 }} />

      <Typography variant="h5">Keyword</Typography>
      <TextField
        variant="outlined"
        placeholder="search keyword..."
        size="medium"
        fullWidth
        value={keyword}
        onChange={handleKeywordChange}
      />
      <Divider sx={{ m: 2 }} />

      <Box display="flex" justifyContent="space-around">
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <Button onClick={handleSearch} variant="contained">
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleFilter;
