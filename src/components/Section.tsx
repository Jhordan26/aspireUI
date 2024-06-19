import React from 'react';
import Typography from '@mui/material/Typography';
import Courses from './Courses'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import './../style/CoursesSection.css'; // Asegúrate de crear y tener este archivo CSS
import { Course } from './Courses';

interface Props {
  addToCart: (course: Course) => void;
}

const CoursesSection: React.FC<Props> = ({ addToCart }) => {
  return (
    <div className="containerSeccion mx-lg-5">
      <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        Conoce nuestros cursos
      </Typography>
      <Courses addToCart={addToCart} />
    </div>
  );
};

export default CoursesSection;
