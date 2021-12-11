import { Box, Divider } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectArticles } from '../../../store/slices/articleSlice';
import Article from '../../../components/Article';

const ArticlesDisplay = () => {
  const articles = useAppSelector(selectArticles);
  return (
    <>
      {articles.map((article) => (
        <Box key={article._id} sx={{ m: 2 }}>
          <Article article={article} />
          <Divider sx={{ m: 2 }} />
        </Box>
      ))}
    </>
  );
};

export default ArticlesDisplay;
