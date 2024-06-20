import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth } from '../Auth/AuthContext';

const defaultTheme = createTheme();

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('login/', { email, password });

      if (response.status === 200) {
        const { token, user } = response.data; // Extraer token y user de la respuesta
        login(token, user); // Llamar a la función login con token y user
        toast.success('Inicio de sesión exitoso: ¡Bienvenido!', { autoClose: 15000 });
        navigate('');

        // Almacenar token y id en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('id', user.id.toString());
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === 'Incorrect password') {
          setPasswordError('Contraseña incorrecta');
        } else if (error.response.data.message === 'User not found') {
          setEmailError('Correo electrónico no encontrado');
        }
      } else {
        toast.error('Error al iniciar sesión, por favor intente nuevamente', { autoClose: 15000 });
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
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '2rem',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <form className="login-form" onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailError)}
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
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item xs>
                  <LinkMui href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </LinkMui>
                </Grid>
                <Grid item>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    {"¿No tienes una cuenta? Regístrate"}
                  </Link>
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
