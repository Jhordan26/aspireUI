import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import axios from '../../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../style/CoursesSection.css';
import { useAuth } from '../pages/Auth/AuthContext';

export interface Course {
	id: number;
	nombre: string;
	descripcion: string;
	imagen: string;
	plan_precio: number;
}

interface Props {
	addToCart: (course: Course) => void;
}

const Courses: React.FC<Props> = ({ addToCart }) => {
	const { isAuthenticated } = useAuth();
	const [courses, setCourses] = useState<Course[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [coursesPerPage] = useState<number>(4);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get<Course[]>('cursos');
				setCourses(response.data);
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		};

		fetchCourses();
	}, []);

	const handleAddToCart = (course: Course) => {
		addToCart(course);
	};

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="container mt-5 mb-5">
			<div className="d-flex flex-column align-items-center gap-3">
				<div className="row row-cols-1 row-cols-md- row-cols-lg-3 g-3 justify-content-center ms-5">
					{currentCourses.map((course) => (
						<div key={course.id} className="col">
							<Card className="shadow-sm h-100">
								<Card.Img variant="top" src={course.imagen} alt={course.nombre} style={{ height: '140px', objectFit: 'cover' }} />
								<Card.Body>
									<Card.Title>{course.nombre}</Card.Title>
									<Card.Text className="text-primary">
										Precio total: S/ {course.plan_precio}
									</Card.Text>
									<Button variant="danger" size="lg" onClick={() => handleAddToCart(course)}>
										Comprar
									</Button>
								</Card.Body>
							</Card>
						</div>
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
		</div>
	);
};

export default Courses;
