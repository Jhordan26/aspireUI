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
            <AppBar position="fixed" sx={{ width: { xs: '100%', md: '110px' }, height: { xs: 'auto', md: '100vh' }, flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', background: '#1E2123', left: 0, top: 0 }}>
                <Toolbar sx={{ flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', width: '100%' }}>
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

                    <Box sx={{ flexGrow: 1 }} />

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

            <Box component="main" sx={{ flexGrow: 1, marginLeft: '70px', padding: '20px' }}>
            </Box>
        </Box>
    );
};

export default ResponsiveAppBar;
