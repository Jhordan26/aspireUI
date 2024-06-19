// App.tsx
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
import CoursesPage from './pages/Courses/CoursesPage'; // Importa tu nueva página de cursos

const App: React.FC = () => {
    const [cart, setCart] = useState<Course[]>([]);

    // Remove useAuth call here
    /*     const { isAuthenticated, logout } = useAuth();
     */
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
                <div className="App">
                    <ResponsiveAppBar />  {/* Incluye tu Navbar aquí */}
                    <div style={{ marginLeft: '110px', width: 'calc(100% - 110px)' }}>

                        <Header
                            cartItems={cart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            clearCart={clearCart}
                            setCart={setCart}
                            // Pass logout as a prop to Header
                            handleLogout={() => {
                                const { logout } = useAuth();
                                logout();
                            }}
                        />
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <Banner imageUrl="img/banner.png" title="" />
                                    <main>
                                        <Courses addToCart={addToCart} />
                                    </main>
                                </>
                            } />
                            <Route path="/courses" element={<CoursesPage addToCart={addToCart} />} /> {/* Asegúrate de pasar addToCart como prop */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/shopping-cart" element={
                                <CartPage
                                    cartItems={cart}
                                    removeFromCart={removeFromCart}
                                    clearCart={clearCart}
                                    setCart={setCart}
                                />
                            } />
                        </Routes>
                    </div>

                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
