// CoursesPage.tsx
import React, { useEffect, useState } from 'react';
import { Course } from '../../components/Courses';
import CoursesComponent from '../../components/Courses';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from '../../../utils/api'; // Importa axios o el cliente HTTP que estés usando
import { margin } from '@mui/system';

interface Props {
    addToCart: (course: Course) => void;
}

const CoursesPage: React.FC<Props> = ({ addToCart }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get<Course[]>('cursos/'); // Ajusta la URL según tu API
                setCourses(response.data);
                setLoading(false); // Cuando los cursos se cargan correctamente, se desactiva el spinner
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false); // En caso de error, también se desactiva el spinner
            }
        };

        fetchCourses();
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4" style={{marginTop:'60px', color:'white'}}>Todos los cursos disponibles</h1>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Row className="justify-content-center">
                    <Col xs={12} md={10}>
                        <CoursesComponent addToCart={addToCart} /> {/* Pasa los cursos cargados como prop */}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CoursesPage;
