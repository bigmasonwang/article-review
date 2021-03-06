import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import ArticleFilter from './ArticlesFilter';
import ArticlesDisplay from './ArticlesDisplay';
import IArticlesQuery from '../../types/IArticlesQuery';
import ArticlesPagination from './ArticlesPagination';
import { useAppDispatch } from '../../hooks';
import { fetchArticles } from '../../store/slices/articleSlice';

const Articles = () => {
  const articlesQuery = {
    dateFrom: '',
    dateTo: '',
    sources: [],
    keyword: '',
    page: 1,
  };
  const [query, setQuery] = useState<IArticlesQuery>(articlesQuery);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const _query = {
      dateFrom: '',
      dateTo: '',
      sources: [],
      keyword: '',
      page: 1,
    };
    dispatch(fetchArticles(_query));
  }, [dispatch]);

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
