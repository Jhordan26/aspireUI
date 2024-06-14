import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/NavBar';
import Banner from './components/Banner';
import { Container } from '@mui/material';
import Courses from './components/Courses';
import LoginPage from './pages/Auth/LoginPage';
import './normalize.css'
import RegisterPage from './pages/Auth/RegisterPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={
            <>
              <Banner imageUrl="img/banner.png" title="" />
              <Container maxWidth="xl">
                <main>
                  <br />
                  <div >
                  <Courses />  
                  </div>
                </main>
              </Container>
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Asegúrate de agregar rutas para otras páginas si las tienes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
