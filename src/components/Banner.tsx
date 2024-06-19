import React from 'react';
import { Box, Typography } from '@mui/material';

interface BannerProps {
  imageUrl: string;
  title: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title }) => {
  return (
    <Box
    
      sx={{
        backgroundImage: `url(/${imageUrl})`, // Utiliza una ruta relativa desde public/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 500, // Ajusta la altura según sea necesario
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        marginTop: '20px'
      }}
    >
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default Banner;
