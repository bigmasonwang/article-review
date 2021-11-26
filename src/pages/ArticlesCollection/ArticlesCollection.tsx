import { Box, Divider } from '@mui/material';
import React from 'react';
import Article from '../../components/Article';
import { useAppSelector } from '../../hooks';
import { selectArticlesCollection } from '../../store/slices/articleSlice';

const ArticlesCollection = () => {
  const articleCollection = useAppSelector(selectArticlesCollection);
  return (
    <div>
      collections
      {articleCollection.map((article) => (
        <Box key={article._id} sx={{ m: 2 }}>
          <Article article={article} displayZHChecked={false} />
          <Divider sx={{ m: 2 }} />
        </Box>
      ))}
    </div>
  );
};

export default ArticlesCollection;
