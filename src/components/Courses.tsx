import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
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
    <div className="container" style={{ marginLeft: '110px' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        Conoce nuestros cursos
      </Typography>
      <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
        {courses.map((course) => (
          <div key={course.id} className="col-md-3 mb-3">
            <Card className="shadow-sm" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={course.imagen} alt={course.nombre} style={{ height: '140px', objectFit: 'cover' }} />
              <CardBody>
                <Card.Title>{course.nombre}</Card.Title>
                <Card.Text className="text-primary">
                  Total price: S/ {course.plan_precio}
                </Card.Text>
                <Button variant="danger" size="md" block>
                  Comprar
                </Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
