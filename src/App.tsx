import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Headers';
import Banner from './components/Banner';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Courses, { Course } from './components/Courses';
import CartPage from './pages/Cart/CartPage';
import { AuthProvider, useAuth } from './pages/Auth/AuthContext';
import ResponsiveAppBar from './components/NavBar';
import CoursesPage from './pages/Courses/CoursesPage'; 
import  './App.css';
// Importa tu nueva página de cursos

const App: React.FC = () => {
    const [cart, setCart] = useState<Course[]>([]);

    const addToCart = (course: Course) => {
        setCart([...cart, course]);
    };

    const removeFromCart = (course: Course) => {
        const updatedCart = cart.filter(item => item.id !== course.id);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            try {
                const parsedCartItems: Course[] = JSON.parse(storedCartItems);
                setCart(parsedCartItems);
            } catch (error) {
                console.error('Error parsing cart items from localStorage:', error);
            }
        }
    }, []);

    const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
        const { isAuthenticated } = useAuth();
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    return (
        <AuthProvider>
            <Router>
                <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <ResponsiveAppBar />
                    <Header
                        cartItems={cart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        clearCart={clearCart}
                        setCart={setCart}
                        handleLogout={() => {
                            const { logout } = useAuth();
                            logout();
                        }}
                    />
                    <Routes>
                        <Route path="/" element={<HomePage addToCart={addToCart} />} />
                        <Route path="/courses" element={<CoursesPage addToCart={addToCart} />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/shopping-cart" element={<CartPage cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} setCart={setCart} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

const HomePage: React.FC<{ addToCart: (course: Course) => void }> = ({ addToCart }) => {
    return (
        <>
            <Banner imageUrl="/img/banner.png" title="Conoce nuestros cursos" />
            <main style={{ flex: 1 }}>
                <Courses addToCart={addToCart} />
            </main>
        </>
    );
};

export default App;
