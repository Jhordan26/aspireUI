import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// Páginas y configuraciones del menú de usuario
const pages = ['Inicio', 'Cursos', 'Sobre', 'Ingresa'];
const settings = ['Perfil', 'Logout'];

const ResponsiveAppBar: React.FC = () => {
    // Estados para manejar los menús de navegación y usuario
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    // Manejar apertura del menú de navegación
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    // Manejar cierre del menú de navegación
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Manejar apertura del menú de usuario
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    // Manejar cierre del menú de usuario
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Manejar clic en las páginas del menú
    const handlePageClick = (page: string) => {
        handleCloseNavMenu();
        if (page === 'Ingresa') {
            navigate('/login');
        } else if (page === 'Cursos') {
            navigate('/courses');
        } else if (page === 'Inicio') {
            navigate('/');
        } else if (page === 'Sobre') {
            navigate('/about');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* AppBar fijado al costado con altura completa */}
            <AppBar position="fixed" sx={{ width: '110px', height: '100vh', flexDirection: 'column', alignItems: 'center', background:'#1E2123', left:'0'}}>
                <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    {/* Icono del logo */}
                    <AdbIcon sx={{ mb: 2 }} />
                    {/* Título/logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mb: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Icono del menú (solo visible en dispositivos pequeños) */}
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <MenuIcon sx={{ mb: 2 }} />
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
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
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Botones de navegación (solo visibles en dispositivos grandes) */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                sx={{
                                    mb: 2,
                                    color: 'inherit',
                                    borderRadius: '40',
                                    backgroundColor: index === pages.length - 1 ? '#f50057' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: index === pages.length - 1 ? '#c51162' : 'transparent',
                                    },
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Espacio flexible para empujar el menú de usuario hacia abajo */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Menú de usuario */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography variant="body1" textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Contenido principal con margen a la izquierda para dejar espacio para la barra de navegación */}
            <Box component="main" sx={{ flexGrow: 1, marginLeft: '110px', padding: '20px' }}>
                {/* Aquí va el contenido principal de la página */}
            </Box>
        </Box>
    );
};

export default ResponsiveAppBar;
