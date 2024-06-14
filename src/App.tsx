import React from 'react';
import ResponsiveAppBar from './components/NavBar';
import Banner from './components/Banner';
import { Container } from '@mui/material';
import Courses from './components/Courses';


const App: React.FC = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Banner imageUrl="img/banner.png" title="" />
      <Container maxWidth="xl">
        <main>
          <br />
          <Courses />
        </main>
      </Container>
    </div>
  );
};

export default App;
