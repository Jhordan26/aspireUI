/* import React from 'react';
import { Typography, Container } from '@mui/material';
import { useAuth } from '../Auth/AuthContext';

const HomePage: React.FC = () => {
    const { isAuthenticated, first_name, last_name } = useAuth();

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" style={{ marginTop: '50px' }}>
                {isAuthenticated ? `Bienvenido ${first_name} ${last_name}` : 'Bienvenido a la página de inicio'}
            </Typography>
        </Container>
    );
};

export default HomePage;
 */