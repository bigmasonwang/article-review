import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import articleSources from '../../../../constants/articleSources';

export default function MultipleSelectChip() {
  const [sources, setSources] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof sources>) => {
    const {
      target: { value },
    } = event;
    setSources(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="multiple-chip-label">Select Source</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={sources}
          onChange={handleChange}
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
  );
}
