import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography, Box, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Course } from '../../components/Courses';
import { useAuth } from '../Auth/AuthContext';
import PayPalComponent from './Paypal';

interface Props {
    cartItems: Course[];
    removeFromCart: (course: Course) => void;
    clearCart: () => void;
    setCart: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CartPage: React.FC<Props> = ({ cartItems, removeFromCart, clearCart, setCart }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [cursoIds, setCursoIds] = useState<number[]>([]);

    const calculateTotal = (): number => {
        return cartItems.reduce((total, course) => total + parseFloat(course.plan_precio.toString()), 0);
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            try {
                const parsedCartItems: Course[] = JSON.parse(storedCartItems);
                setCart(parsedCartItems);
                const ids = parsedCartItems.map(course => course.id);
                setCursoIds(ids);
            } catch (error) {
                console.error('Error parsing cart items from localStorage:', error);
            }
        }

        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [setCart, isAuthenticated, navigate]);

    const handleRemoveFromCart = (course: Course) => {
        const updatedCartItems = cartItems.filter(item => item.id !== course.id);
        setCart(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        removeFromCart(course);
        setCursoIds(updatedCartItems.map(item => item.id)); // Actualizar los IDs en el estado
    };

    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem('cartItems');
        clearCart();
        setCursoIds([]); // Limpiar los IDs en el estado
    };

    return (
        <Container maxWidth="md" sx={{ mt: 16, mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {cartItems.length > 0 ? (
                        cartItems.map((course) => (
                            <Card key={course.id} sx={{ display: 'flex', mb: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 130 }}
                                    image={course.imagen}
                                    alt={course.nombre}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {course.nombre}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            S/ {course.plan_precio}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <IconButton aria-label="delete" onClick={() => handleRemoveFromCart(course)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="h6" gutterBottom>
                            Tu carrito está vacío.
                        </Typography>
                    )}
                    <Button variant="contained" color="secondary" onClick={handleClearCart} fullWidth sx={{ mt: 2 }}>
                        Vaciar carrito
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#1E2123' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Resumen del pedido
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            Total: S/ {calculateTotal()}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            Items: {cartItems.length}
                        </Typography>
                        {isAuthenticated && cartItems.length > 0 && (
                            <PayPalComponent ventaItems={cartItems} cursoIds={cursoIds} currency="USD" />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartPage;
