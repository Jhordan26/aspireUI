import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth } from '../pages/Auth/AuthContext'; // Importa tu contexto de autenticación aquí

const pages = ['Inicio', 'Cursos', 'Mis cursos', 'Sobre'];
const settings = ['Perfil', 'Logout'];

const ResponsiveAppBar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth(); // Obtener el estado de autenticación y los datos del usuario del contexto

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
        if (page === 'Cursos') {
            navigate('/courses');
        } else if (page === 'Inicio') {
            navigate('/home');
        } else if (page === 'Sobre') {
            navigate('/about');
        } else if (page === 'Mis cursos') {
            navigate('/mis-cursos');
        }
        // No hacer nada si el usuario está autenticado y hace clic en 'Ingresa'
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirigir al usuario a la página de inicio o donde sea necesario después del logout
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ width: { xs: '100%', md: '110px' }, height: { xs: 'auto', md: '100vh' }, flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', background: '#1E2123', left: 0, top: 0 }}>
                <Toolbar sx={{ flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', width: '100%', mt: { xs: 0, md: 8 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <AdbIcon sx={{ mb: { xs: 0, md: 2 } }} />
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: '100%' }}>
                        {pages.map((page) => (
                            (page === 'Mis cursos' && !isAuthenticated) ? null : (
                                <Button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    sx={{
                                        mb: 2,
                                        color: 'inherit',
                                        borderRadius: '0px',
                                        justifyContent: 'flex-start',
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                        },
                                        width: '100%',
                                        padding: '10px 20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {page}
                                </Button>
                            )
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex' }, ml: { xs: 'auto', md: 0 } }}>
                        {isAuthenticated ? (
                            <>
                                <Tooltip title="Open settings">
                                    <Button onClick={handleOpenUserMenu} sx={{ p: 0, color: 'inherit' }}>
                                        {user && `${user.first_name} ${user.last_name}`}
                                    </Button>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ResponsiveAppBar;
