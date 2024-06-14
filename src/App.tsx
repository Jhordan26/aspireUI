import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Headers';
import Banner from './components/Banner';
import { Container } from '@mui/material';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Courses, { Course } from './components/Courses';
import Cart from './components/Cart/Cart';

const App: React.FC = () => {
    const [cart, setCart] = useState<Course[]>([]); // Estado para el carrito de compras
    const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar la apertura del drawer de carrito

    // Función para agregar un curso al carrito
    const addToCart = (course: Course) => {
        setCart([...cart, course]);
        setIsCartOpen(true); // Abrir el drawer al agregar un curso al carrito
    };

    // Función para eliminar un curso del carrito
    const removeFromCart = (course: Course) => {
        const updatedCart = cart.filter(item => item.id !== course.id);
        setCart(updatedCart);
    };

    // Función para alternar la visibilidad del drawer del carrito
    const toggleDrawer = (open: boolean) => {
        setIsCartOpen(open);
    };

    return (
        <Router>
            <div className="App">
                <Header cartItems={cart} toggleDrawer={toggleDrawer} /> {/* Pasar toggleDrawer al Header */}
                <Routes>
                    <Route path="/" element={
                        <>
                            <Banner imageUrl="img/banner.png" title="" />
                            <Container maxWidth="xl">
                                <main>
                                    <br />
                                    <Courses addToCart={addToCart} /> {/* Pasa la función addToCart a Courses */}
                                </main>
                            </Container>
                        </>
                    } />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Asegúrate de agregar rutas para otras páginas si las tienes */}
                </Routes>
                <Cart cartItems={cart} removeFromCart={removeFromCart} isOpen={isCartOpen} toggleDrawer={toggleDrawer} /> {/* Pasa cart y removeFromCart al componente Cart */}
            </div>
        </Router>
    );
};

export default App;
