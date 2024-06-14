import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import axios from '../../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  plan_precio: string | number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage] = useState<number>(4);

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

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row flex-wrap justify-content-center gap-3">
        {currentCourses.map((course) => (
          <Card key={course.id} className="shadow-sm" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={course.imagen} alt={course.nombre} style={{ height: '140px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{course.nombre}</Card.Title>
              <Card.Text className="text-primary">
                Total price: S/ {course.plan_precio}
              </Card.Text>
              <Button variant="danger" size="lg" >
                Comprar
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination className="mt-4">
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default Courses;
