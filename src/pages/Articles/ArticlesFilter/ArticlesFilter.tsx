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
  OutlinedInput,
  Chip,
} from '@mui/material';
import articleSources from '../../../constants/articleSources';
import IArticlesQuery from '../../../types/IArticlesQuery';
import { useAppDispatch } from '../../../hooks';
import { fetchArticles } from '../../../store/slices/articleSlice';

const ArticleFilter: React.FC<{ query: IArticlesQuery; setQuery: any }> = ({
  query,
  setQuery,
}) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');

  const dispatch = useAppDispatch();

  const handleDateFromChange = (newValue: Date | null) => {
    setDateFrom(newValue);
    let _dateFrom = '';
    if (newValue) {
      _dateFrom = `${newValue.getFullYear()}${(
        '0' +
        (newValue.getMonth() + 1)
      ).slice(-2)}${('0' + newValue.getDate()).slice(-2)}`;
    }
    setQuery({
      ...query,
      dateFrom: _dateFrom,
    });
  };

  const handleDateToChange = (newValue: Date | null) => {
    setDateTo(newValue);
    let _dateTo = '';
    if (newValue) {
      _dateTo = `${newValue.getFullYear()}${(
        '0' +
        (newValue.getMonth() + 1)
      ).slice(-2)}${('0' + newValue.getDate()).slice(-2)}`;
    }
    setQuery({
      ...query,
      dateTo: _dateTo,
    });
  };

  const handleSourcesChange = (event: SelectChangeEvent<typeof sources>) => {
    const {
      target: { value },
    } = event;
    const _sources = typeof value === 'string' ? value.split(',') : value;
    setSources(_sources);
    setQuery({
      ...query,
      sources: _sources,
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
    setDateFrom(null);
    setDateTo(null);
    setSources([]);
    setKeyword('');
    setQuery({
      dateFrom: '',
      dateTo: '',
      sources: [],
      keyword: '',
      page: 1,
    });
  };

  const handleSearch = () => {
    dispatch(fetchArticles(query));
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
      <div>
        <FormControl fullWidth>
          <InputLabel id="multiple-chip-label">Select</InputLabel>
          <Select
            labelId="multiple-chip-label"
            id="multiple-chip"
            multiple
            value={sources}
            onChange={handleSourcesChange}
            input={<OutlinedInput id="select-multiple-chip" label="source" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {articleSources.map((source) => (
              <MenuItem key={source} value={source}>
                {source}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
