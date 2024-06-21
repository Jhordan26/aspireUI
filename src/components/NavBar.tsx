import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useAuth } from '../pages/Auth/AuthContext';
import librosIcon from './../../public/img/libros.png';
import casaIcon from './../../public/img/casa.png';
import tarboxIcon from './../../public/img/targox.jpg';
import aspireIcon from './../../public/img/aspire.png';
import entrarIcon from './../../public/img/entrar.png';

const pages = ['Inicio', 'Cursos', 'Mis cursos', 'Sobre'];
const settings = ['Perfil', 'Logout'];

const ResponsiveAppBar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlePageClick = (page: string) => {
        handleCloseNavMenu();
        switch (page) {
            case 'Cursos':
                navigate('/courses');
                break;
            case 'Inicio':
                navigate('/home');
                break;
            case 'Sobre':
                navigate('/about');
                break;
            case 'Mis cursos':
                navigate('/mis-cursos');
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AppBar position="fixed" sx={{ width: { xs: '100%', md: '90px' }, height: { xs: 'auto', md: '100vh' }, flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', background: '#1E2123', left: 0, top: 0 }}>
                <Toolbar sx={{ flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', width: '100%', mt: { xs: 0, md: 8 } }}>
                    {/* Imagen de tarbox */}
                    <img src={tarboxIcon} alt="Tarbox" style={{ marginBottom: '150px', width: '20px', height: '20px', marginTop: '-36px' }} />

                    {/* Menú para pantallas pequeñas */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', width: '100%' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                                    <Typography variant="body1" textAlign="center">
                                        {page === 'Inicio' ? (
                                            <img src={casaIcon} alt="Inicio" style={{ width: 24, height: 24, marginRight: 8 }} />
                                        ) : page === 'Cursos' ? (
                                            <img src={librosIcon} alt="Cursos" style={{ width: 24, height: 24, marginRight: 8 }} />
                                        ) : page === 'Sobre' ? (
                                            <img src={aspireIcon} alt="Sobre" style={{ width: 24, height: 24, marginRight: 8 }} />
                                        ) : page === 'Ingresa' ? (
                                            <img src={entrarIcon} alt="Ingresa" style={{ width: 24, height: 24, marginRight: 8 }} />
                                        ) : (
                                            page
                                        )}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Botones de navegación para pantallas medianas y grandes */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        {pages.map((page) => {
                            const getIcon = () => {
                                switch (page) {
                                    case 'Inicio':
                                        return casaIcon;
                                    case 'Cursos':
                                        return librosIcon;
                                    case 'Sobre':
                                        return aspireIcon;
                                    default:
                                        return null;
                                }
                            };

                            const icon = getIcon();

                            return (
                                isAuthenticated || page !== 'Mis cursos' ? (
                                    <Button
                                        key={page}
                                        onClick={() => handlePageClick(page)}
                                        sx={{
                                            mb: 2,
                                            color: 'inherit',
                                            borderRadius: '0px',
                                            justifyContent: 'center',
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.1)',
                                            },
                                            width: '100%',
                                            padding: '10px 10px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {icon ? (
                                            <img src={icon} alt={page} style={{ width: 24, height: 24, marginRight: 8 }} />
                                        ) : (
                                            page
                                        )}
                                    </Button>
                                ) : null
                            );
                        })}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex' }, ml: { xs: 'auto', md: 0 }, justifyContent: 'center', alignItems: 'center' }}>
                        {isAuthenticated ? (
                            <Typography sx={{ color: 'white', mb: 2 }}>{`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}</Typography>
                        ) : (
                            <Button
                                key="Ingresar"
                                onClick={() => navigate('/login')}
                                sx={{
                                    mb: 2,
                                    color: 'inherit',
                                    borderRadius: '0px',
                                    justifyContent: 'center',
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    width: '100%',
                                    padding: '10px 10px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <img src={entrarIcon} alt="Ingresar" style={{ width: 24, height: 24, marginRight: 8 }} />

                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ResponsiveAppBar;
