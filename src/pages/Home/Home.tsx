import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Article from '../../components/Article';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchReceivedArticles,
  selectReceivedArticles,
} from '../../store/slices/userSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const receivedArticles = useAppSelector(selectReceivedArticles);
  useEffect(() => {
    dispatch(fetchReceivedArticles());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2">Received Articles</Typography>
      {receivedArticles.map((article) => (
        <Box key={article._id} sx={{ m: 2 }}>
          <Article article={article} />
          <Divider sx={{ m: 2 }} />
        </Box>
      ))}
    </>
  );
};

export default Home;
