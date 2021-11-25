import React, { useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import ArticleFilter from './ArticlesFilter';
import ArticlesDisplay from './ArticlesDisplay';
import IArticlesQuery from '../../types/IArticlesQuery';
import ArticlesPagination from './ArticlesPagination';

const Articles = () => {
  const articlesQuery = {
    dateFrom: '',
    dateTo: '',
    source: '',
    keyword: '',
    page: 1,
  };
  const [query, setQuery] = useState<IArticlesQuery>(articlesQuery);

  return (
    <Box>
      <Typography variant="h2">Articles</Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 6 }}>
        <Grid item xs={12} md={3}>
          <ArticleFilter query={query} setQuery={setQuery} />
        </Grid>
        <Grid item xs={12} md={9}>
          <ArticlesDisplay />
          <ArticlesPagination query={query} setQuery={setQuery} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Articles;
