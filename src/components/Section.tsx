import React from 'react';
import Typography from '@mui/material/Typography';
import Courses from './Courses'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';

const CoursesSection: React.FC = () => {
  return (
    <div className="container" style={{ marginLeft: '110px' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        Conoce nuestros cursos
      </Typography>
      <Courses />
    </div>
  );
};

export default CoursesSection;
