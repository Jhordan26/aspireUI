import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
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
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 justify-center">
        {courses.map((course) => (
          <Card key={course.id} shadow="sm" onPress={() => console.log("item pressed")} className="max-w-sm">
            <Image
              src={course.imagen}
              alt={course.nombre}
              width="20%"
              height="140px"
              className="object-cover rounded-t-lg"
            />
            <CardBody>
              <Typography variant="h5" component="div" gutterBottom>
                {course.nombre}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ color: 'red', marginTop: '10px' }}>
                Total price: S/ {course.plan_precio}
              </Typography>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <Button size="medium" color="error" variant="contained">
                Comprar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
