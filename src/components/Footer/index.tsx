import { Box } from '@mui/system';
import React from 'react';

const Footer = () => {
  const curyear = new Date(Date.now()).getFullYear();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      © {curyear} Incantare Investment
    </Box>
  );
};

export default Footer;
