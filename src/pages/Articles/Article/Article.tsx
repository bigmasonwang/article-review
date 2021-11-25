import { Paper, Typography, Box, Link } from '@mui/material';
import React, { useState } from 'react';
import IArticle from '../../../types/IArticle';

const Article: React.FC<{ article: IArticle }> = ({ article }) => {
  const [paperElevation, setPaperElevation] = useState(0);

  return (
    <div
      onMouseEnter={() => setPaperElevation(1)}
      onMouseLeave={() => setPaperElevation(0)}
    >
      <Paper elevation={paperElevation}>
        <Box display="flex" justifyContent="space-between">
          <Typography>{article.source}</Typography>
          <Typography>{article.date}</Typography>
        </Box>
        <Typography variant="h4">{article.title_en}</Typography>
        <Typography variant="subtitle1">{article.title}</Typography>

        <Typography>{article.content_en}</Typography>
        <Typography>{article.content}</Typography>
        <Link href={article.url}>link</Link>
      </Paper>
    </div>
  );
};

export default Article;
