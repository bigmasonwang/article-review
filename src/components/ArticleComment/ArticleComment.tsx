import React from 'react';
import IArticleComment from '../../types/IArticleComment';
import { Typography, Box } from '@mui/material';

const ArticleComment: React.FC<{ comment: IArticleComment }> = ({
  comment,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="body1">{comment.commenterName}</Typography> :
      <Typography variant="body1">{comment.text}</Typography>
    </Box>
  );
};

export default ArticleComment;
