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
import { selectShowZH, selectShowEN } from '../../store/slices/settingSlice';

const Article: React.FC<{ article: IArticle }> = ({ article }) => {
  const dispatch = useAppDispatch();
  const articleCollection = useAppSelector(selectArticlesCollection);
  const displayZHChecked = useAppSelector(selectShowZH);
  const displayENChecked = useAppSelector(selectShowEN);

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
      <Typography variant="h4">{article.title}</Typography>
      {displayENChecked && (
        <Typography variant="h5">{article.title_en}</Typography>
      )}

      {displayENChecked && <Typography>{article.content_en}</Typography>}

      {displayZHChecked && <Typography>{article.content}</Typography>}
      <Link href={article.url} target="_blank">
        link
      </Link>
    </>
  );
};

export default Article;
