import { Box, Divider, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { selectArticles } from '../../../store/slices/articleSlice';
import Article from '../../../components/Article';

const ArticlesDisplay = () => {
  const articles = useAppSelector(selectArticles);

  const [displayZHChecked, setDisplayZHChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayZHChecked(event.target.checked);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <FormControlLabel
          label="Show Original"
          control={
            <Switch
              checked={displayZHChecked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
        />
      </Box>

      {articles.map((article) => (
        <Box key={article._id} sx={{ m: 2 }}>
          <Article article={article} displayZHChecked={displayZHChecked} />
          <Divider sx={{ m: 2 }} />
        </Box>
      ))}
    </>
  );
};

export default ArticlesDisplay;
