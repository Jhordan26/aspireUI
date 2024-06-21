import React, { useState, useEffect } from 'react';
import {
	MDBBtn,
	MDBCardImage,
	MDBCol,
	MDBRow,
	MDBTypography,
} from 'mdb-react-ui-kit';
import {
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface Course {
	id: number;
	nombre: string;
	descripcion: string;
	imagen: string;
	plan_precio: string | number;
}

interface Props {
	cartItems: Course[];
	addToCart: (course: Course) => void;
	removeFromCart: (course: Course) => void;
	clearCart: () => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, clearCart }) => {
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const navigate = useNavigate();

	// Almacenar el carrito en localStorage cada vez que cambia
	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [cartItems]);

	const calculateTotal = (): number => {
		return cartItems.reduce((total, course) => total + parseFloat(course.plan_precio.toString()), 0);
	};

	const countItems = (course: Course): number => {
		return cartItems.filter(item => item.id === course.id).length;
	};

	const handleRemoveFromCart = (course: Course): void => {
		removeFromCart(course);
	};

	const handleGoToCart = (): void => {
		navigate('/shopping-cart');
	};

	return (
		<div>
			<div
				onMouseEnter={() => setIsPopupVisible(true)}
				onMouseLeave={() => setIsPopupVisible(false)}
				style={{ position: 'relative', display: 'inline-block' }}
			>
				<ShoppingCartIcon />
				{isPopupVisible && (
					<div
						style={{
							position: 'absolute',
							top: '100%',
							right: 0,
							width: '300px',
							backgroundColor: 'white',
							boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
							zIndex: 10,
							padding: '16px',
							borderRadius: '4px',
							border: '1px solid #ccc'
						}}
					>
						<MDBTypography tag="h5" className="mb-4" style={{ color: 'black' }}>
							Tu Carrito de Compras
						</MDBTypography>
						<List>
							{cartItems.length === 0 ? (
								<ListItem>
									<ListItemText primary="Tu carrito de compras está vacío." />
								</ListItem>
							) : (
								cartItems.map((course) => (
									<React.Fragment key={course.id}>
										<ListItem>
											<MDBRow className="align-items-center" style={{ width: '100%' }}>
												<MDBCol md="2">
													<IconButton edge="start" aria-label="delete" onClick={() => handleRemoveFromCart(course)}>
														<DeleteIcon />
													</IconButton>
												</MDBCol>
												<MDBCol md="3">
													<MDBCardImage
														src={course.imagen}
														alt={course.nombre}
														fluid
														className="rounded-3"
														style={{ width: '65px' }}
													/>
												</MDBCol>
												<MDBCol md="5">
													<MDBTypography tag="h6" className="mb-1">
														{course.nombre}
													</MDBTypography>
													<MDBTypography tag="p" className="small mb-0">
														{course.descripcion}
													</MDBTypography>
													<MDBTypography tag="p" className="small mb-0">
														S/ {course.plan_precio}
													</MDBTypography>
												</MDBCol>
												<MDBCol md="2">
													<MDBTypography tag="p" className="mb-0">
														x {countItems(course)}
													</MDBTypography>
												</MDBCol>
											</MDBRow>
										</ListItem>
										<Divider />
									</React.Fragment>
								))
							)}
						</List>
						<MDBRow className="mt-3 mb-3">
							<MDBCol className="d-flex justify-content-between">
								<MDBTypography tag="h6" className="mb-0">
									Total: S/ {calculateTotal()}
								</MDBTypography>
							</MDBCol>
						</MDBRow>
						<MDBRow className="mt-2">
							<MDBCol className="d-flex justify-content-around">
								<MDBBtn onClick={handleGoToCart} size="sm">Ver Carrito</MDBBtn>
								<MDBBtn onClick={clearCart} size="sm" color="danger">Vaciar Carrito</MDBBtn>
							</MDBCol>
						</MDBRow>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
