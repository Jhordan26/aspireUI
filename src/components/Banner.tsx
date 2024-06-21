import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface BannerProps {
    imageUrl: string;
    title: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title }) => {
    return (
        <Box
            className="banner-container"
            style={{
              background: `url(${imageUrl}) no-repeat center center`,
              backgroundSize: '100% 100%', // Ajusta la imagen al 100% del ancho y alto del contenedor
              height: '500px',
              marginTop: '60px',
              marginLeft: '89px',
              position: 'relative',
              marginBottom: '20px', // Espacio inferior para separar del contenido debajo
          }}
          
          
        >
            <Box
                className="banner-overlay"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start', // Alineación al inicio (izquierda)
                    textAlign: 'left',
                    color: 'white',
                    padding: '20px',
                    overflowWrap: 'break-word', // Permite dividir palabras largas
                    wordWrap: 'break-word', // Permite dividir palabras largas
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', maxWidth: '80%' }}>
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default Banner;
