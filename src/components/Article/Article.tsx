import { Typography, Box, Link, Button, TextField } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react';
import IArticle from '../../types/IArticle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addArticle,
  editArticle,
  removeArticle,
  selectArticlesCollection,
} from '../../store/slices/articleSlice';
import { selectShowZH, selectShowEN } from '../../store/slices/settingSlice';
import { LoadingButton } from '@mui/lab';

const Article: React.FC<{ article: IArticle }> = ({ article }) => {
  const dispatch = useAppDispatch();
  const articleCollection = useAppSelector(selectArticlesCollection);
  const displayZHChecked = useAppSelector(selectShowZH);
  const displayENChecked = useAppSelector(selectShowEN);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentEN, setContentEN] = useState(article.content_en);

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

  const handleEditModeChange = (event: React.MouseEvent<HTMLElement>) => {
    setEditMode((state) => !state);
  };

  const handleSaveButtonOnclick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    try {
      setIsLoading(true);
      await dispatch(
        editArticle({ _id: article._id, title_en: '', content_en: contentEN })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setEditMode(false);
    }
  };

  const hadleContentENChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentEN(event.target.value);
  };

  return (
    <>
      {editMode ? (
        <>
          <LoadingButton
            // color="secondary"
            onClick={handleSaveButtonOnclick}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ width: 120 }}
          >
            Save
          </LoadingButton>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleEditModeChange}
            sx={{ width: 120 }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditModeChange}
          sx={{ width: 120 }}
        >
          Edit
        </Button>
      )}

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

      {displayZHChecked && <Typography>{article.content}</Typography>}

      {displayENChecked && !editMode && (
        <Typography>{article.content_en}</Typography>
      )}

      {editMode && (
        <TextField
          id="multiline-article-edit"
          label="Edit Content"
          multiline
          fullWidth
          value={contentEN}
          onChange={hadleContentENChange}
        />
      )}

      <Link href={article.url} target="_blank">
        link
      </Link>
    </>
  );
};

export default Article;
