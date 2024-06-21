import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { useAuth } from '../../pages/Auth/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import '@fontsource/roboto-slab'; // Importa la fuente Roboto Slab

interface Curso {
    id: number;
    curso_nombre: string;
    curso_imagen: string;
    categoria_nombre: string;
    subcategoria_nombre: string;
}

const MisCursosPage: React.FC = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get('https://jellyfish-app-olbh8.ondigitalocean.app/api/inscripciones-curso/', {
                    headers: { Authorization: `Token ${token}` }
                });
                setCursos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los cursos');
                setLoading(false);
            }
        };

        fetchCursos();
    }, [token]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: { xs: 2, md: 3 },
                marginLeft: { md: '120px' }, // Deja espacio para la barra de navegación
                marginTop: { xs: '56px', md: '64px' }, // Deja espacio para el header
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: 'calc(100vh - 64px)', // Ajusta la altura total para excluir el header
                boxSizing: 'border-box',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 1200 }}>
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    textAlign="center" 
                    sx={{ color: 'white', fontFamily: 'Roboto Slab' }}
                >
                    MIS CURSOS
                </Typography>
                {cursos.length === 0 ? (
                    <Typography variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
                        Aun no tienes cursos. ¡Empieza a explorar!
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {cursos.map((curso) => (
                            <Grid item xs={12} sm={6} md={4} key={curso.id}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={curso.curso_imagen}
                                        alt={curso.curso_nombre}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {curso.curso_nombre}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {curso.categoria_nombre} - {curso.subcategoria_nombre}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default MisCursosPage;
