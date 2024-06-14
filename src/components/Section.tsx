import React from 'react';
import Typography from '@mui/material/Typography';
import Courses from './Courses'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import './../style/CoursesSection.css'; // Asegúrate de crear y tener este archivo CSS

const CoursesSection: React.FC = () => {
  return (
    <div className="containerSeccion mx-lg-5">
      <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        Conoce nuestros cursos
      </Typography>
      <Courses />
    </div>
  );
};

export default CoursesSection;
