import { Badge, Box, Button, Link } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectArticlesCollection } from '../../store/slices/articleSlice';

const Header = () => {
  const articlesNum = useAppSelector(selectArticlesCollection).length;
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-around' }}>
      <Link
        component={RouterLink}
        to="/"
        sx={{ fontSize: 24 }}
        underline="none"
      >
        <Button sx={{ fontSize: 24, pt: 0 }}>Incantare Investment</Button>
      </Link>

      <Link
        component={RouterLink}
        to="articles"
        sx={{ fontSize: 24 }}
        underline="none"
      >
        <Button sx={{ fontSize: 24, pt: 0 }}>Articles</Button>
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
          sx={{ fontSize: 20 }}
          underline="none"
        >
          Collection
        </Link>
      </Button>
    </Box>
  );
};

export default Header;
