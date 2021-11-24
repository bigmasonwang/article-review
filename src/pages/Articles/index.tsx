import React from 'react';
import { Box } from '@mui/material';
import ArticleFilter from './ArticleFilter';
import ArticlesDisplay from './ArticlesDisplay';

const Articles = () => {
  return (
    <Box>
      Articles
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
        <ArticleFilter />
        <ArticlesDisplay />
      </Box>
    </Box>
  );
};

export default Articles;
