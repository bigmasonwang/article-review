import { Typography, Box, Link, Button } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import React from 'react';
import IArticle from '../../types/IArticle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addArticle,
  removeArticle,
  selectArticlesCollection,
} from '../../store/slices/articleSlice';

const Article: React.FC<{ article: IArticle; displayZHChecked: boolean }> = ({
  article,
  displayZHChecked,
}) => {
  const dispatch = useAppDispatch();
  const articleCollection = useAppSelector(selectArticlesCollection);

  let articleInCollection = articleCollection.some(
    (a) => a._id === article._id
  );

  const handleAddButtonOnClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(addArticle(article));
    articleInCollection = !articleInCollection;
  };
  const handleRemoveButtonOnClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(removeArticle(article));
    articleInCollection = !articleInCollection;
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography>{article.source}</Typography>
        <Typography>{article.date}</Typography>

        {articleInCollection ? (
          <Button
            variant="contained"
            startIcon={<PlaylistRemoveIcon />}
            onClick={handleRemoveButtonOnClick}
            sx={{ width: 120 }}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="outlined"
            startIcon={<PlaylistAddIcon />}
            onClick={handleAddButtonOnClick}
            sx={{ width: 120 }}
          >
            Add
          </Button>
        )}
      </Box>
      <Typography variant="h4">{article.title_en}</Typography>
      {displayZHChecked && (
        <Typography variant="subtitle1">{article.title}</Typography>
      )}

      <Typography>{article.content_en}</Typography>
      {displayZHChecked && <Typography>{article.content}</Typography>}
      <Link href={article.url} target="_blank">
        link
      </Link>
    </>
  );
};

export default Article;
