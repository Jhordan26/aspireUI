import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../utils/api';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinkMui from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const defaultTheme = createTheme();

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate(); // Obtiene la función navigate

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login/', { email, password });

      if (response.status === 200) {
        // Inicio de sesión exitoso, redirigir a la página de inicio
        toast.success('Signin successful: WELCOME!', { autoClose: 15000 });
        navigate('/home'); // Utiliza navigate para redirigir a '/home'
      } else {
        throw new Error('Error signing in');
      }
    } catch (error: any) {
      // Manejo de errores de inicio de sesión
      if (error.response.status === 400) {
        // Manejo específico de errores 401 (no autorizado)
        if (error.response.data.message === 'Incorrect password') {
          setPasswordError('Contraseña incorrecta');
        } else if (error.response.data.message === 'User not found') {
          setEmailError('Correo electrónico no encontrado');
        }
      } else {
        // Otros errores de servidor
        toast.error('Error signing in, Please try again🤗', { autoClose: 15000 });
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            color: '#243345',
            backgroundImage: 'url(img/aspire-logo-blanco.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 'auto', // Ajuste para centrar en la página
              marginRight: 'auto', // Ajuste para centrar en la página
              padding: '2rem', // Añadir espacio alrededor del contenido
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="login-form" onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== null}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== null}
                helperText={passwordError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <LinkMui href="#" variant="body2">
                    Olvidaste tu Contraseña?
                  </LinkMui>
                </Grid>
                <Grid item>
                  <LinkMui component={Link} to="/register" variant="body2">
                    {"No tienes una cuenta? Registrate"}
                  </LinkMui>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
