import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from '../../utils/api';

interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  plan_precio: string | number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('cursos/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        Conoce nuestros cursos
      </Typography>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {courses.map((course) => (
          <Card key={course.id} sx={{ maxWidth: 320 }}>
            <CardMedia
              component="img"
              height="200"
              image={course.imagen}
              alt={course.nombre}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {course.nombre}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ color: 'red', marginTop: '10px' }}>
                Total price: S/ {course.plan_precio}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="medium" color="error" variant="contained">
                Comprar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
