import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import Article from '../../components/Article';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectArticlesCollection } from '../../store/slices/articleSlice';
import {
  fetchAllUsers,
  selectUsers,
  sendArticles,
} from '../../store/slices/userSlice';
import { LoadingButton } from '@mui/lab';

const ArticlesCollection = () => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const articleCollection = useAppSelector(selectArticlesCollection);
  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector((state) => state.user.fetchAllUsersStatus);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [usersStatus, dispatch]);

  const handleUserChange = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
  };

  const handleSendButtonClick = async () => {
    const articleIds = articleCollection.map((article) => article._id);
    try {
      setIsLoading(true);
      await dispatch(sendArticles({ sendToUserId: userId, articleIds }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h2">collections</Typography>

      <Box sx={{ minWidth: 120, maxWidth: 360, display: 'flex' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Send To</InputLabel>
          <Select
            labelId="select-user-label"
            id="select-user"
            value={userId}
            label="User"
            onChange={handleUserChange}
          >
            {users &&
              users.map((user) => (
                <MenuItem value={user._id} key={user._id}>
                  {user.userName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          sx={{ width: 120 }}
          loadingPosition="end"
          endIcon={<SendIcon />}
          onClick={handleSendButtonClick}
        >
          Send
        </LoadingButton>
      </Box>

      {articleCollection &&
        articleCollection.map((article) => (
          <Box key={article._id} sx={{ m: 2 }}>
            <Article article={article} />
            <Divider sx={{ m: 2 }} />
          </Box>
        ))}
    </div>
  );
};

export default ArticlesCollection;
