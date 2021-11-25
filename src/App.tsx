import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Articles from './pages/Articles';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="xl" sx={{ border: 'solid 1px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
