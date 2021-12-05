import { Badge, Box, Button, Link } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectArticlesCollection } from '../../store/slices/articleSlice';
import {
  removeCredentials,
  selectUserName,
} from '../../store/slices/authSlice';

const Header = () => {
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  const articlesNum = useAppSelector(selectArticlesCollection).length;

  const handleLogout = () => {
    dispatch(removeCredentials());
  };
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        sx={{ fontSize: 24 }}
        underline="none"
      >
        <Button sx={{ fontSize: 24 }}>Incantare Investment</Button>
      </Link>

      <Link
        component={RouterLink}
        to="articles"
        sx={{ fontSize: 24 }}
        underline="none"
      >
        <Button sx={{ fontSize: 24 }}>Articles</Button>
      </Link>

      <Button
        startIcon={
          <Badge color="secondary" badgeContent={articlesNum}>
            <LibraryBooksIcon />
          </Badge>
        }
      >
        <Link
          component={RouterLink}
          to="collection"
          sx={{ fontSize: 24 }}
          underline="none"
        >
          Collection
        </Link>
      </Button>

      {userName ? (
        <Button sx={{ fontSize: 24 }} onClick={handleLogout}>
          Log out
        </Button>
      ) : (
        <Box>
          <Link
            component={RouterLink}
            to="signup"
            sx={{ fontSize: 24 }}
            underline="none"
          >
            <Button sx={{ fontSize: 24 }}>Signup</Button>
          </Link>
          <Link
            component={RouterLink}
            to="login"
            sx={{ fontSize: 24 }}
            underline="none"
          >
            <Button sx={{ fontSize: 24 }}>Login</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Header;
