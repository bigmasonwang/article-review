import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { selectArticles } from '../../../store/slices/articleSlice';
import Article from '../Article';

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
        <Box key={article.title} sx={{ m: 2 }}>
          <Article article={article} displayZHChecked={displayZHChecked} />
        </Box>
      ))}
    </>
  );
};

export default ArticlesDisplay;
