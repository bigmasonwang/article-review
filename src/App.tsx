import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import LanguageSetting from './components/LanguageSetting';
import Articles from './pages/Articles';
import ArticlesCollection from './pages/ArticlesCollection';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <LanguageSetting />
      <Container maxWidth="xl" sx={{ border: 'solid 1px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/collection" element={<ArticlesCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
