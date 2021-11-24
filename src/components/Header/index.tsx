import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-around' }}>
      <Button sx={{ fontSize: 24, pt: 0 }} href="/">
        Incantare Investment
      </Button>
      <Link
        component={RouterLink}
        to="articles"
        sx={{ fontSize: 24 }}
        underline="none"
      >
        Articles
      </Link>
    </Box>
  );
};

export default Header;
