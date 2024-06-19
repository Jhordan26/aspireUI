import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Cart from './Cart/Cart';
import { Course } from '../components/Courses';
import { useAuth } from '../pages/Auth/AuthContext';

interface Props {
    cartItems: Course[];
    addToCart: (course: Course) => void;
    removeFromCart: (course: Course) => void;
    clearCart: () => void;
    setCart: React.Dispatch<React.SetStateAction<Course[]>>;
    handleLogout: () => void;
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, clearCart, setCart, handleLogout }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const cartItemCount = cartItems.length;

    const { isAuthenticated, logout } = useAuth(); // Asegúrate de usar useAuth dentro del componente AuthProvider

    return (
        <Box sx={{ display: 'flex', width: '100%', boxSizing: 'border-box' }}>
            <AppBar position="static" sx={{ width: '100%', boxSizing: 'border-box', padding: '0px'}}>
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <div
                        style={{ position: 'relative', display: 'inline-block' }}
                        onMouseEnter={() => setIsPopupVisible(true)}
                        onMouseLeave={() => setIsPopupVisible(false)}
                    >
                        <IconButton
                            aria-label="show cart items"
                            color="inherit"
                            sx={{ ml: 2 }}
                            component={Link}
                            to="/shopping-cart"
                        >
                            <Badge badgeContent={cartItemCount} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {isPopupVisible && (
                            <div style={{ position: 'absolute', right: 0, zIndex: 10 }}>
                                <Cart
                                    cartItems={cartItems}
                                    removeFromCart={removeFromCart}
                                    clearCart={clearCart}
                                    addToCart={addToCart}
                                    setCart={setCart}
                                />
                            </div>
                        )}
                    </div>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
