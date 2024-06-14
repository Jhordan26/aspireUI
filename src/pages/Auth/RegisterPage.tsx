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

const defaultTheme = createTheme();

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dni, setDni] = useState<string>('');
    const [celular, setCelular] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [genero, setGenero] = useState<string>(''); // Estado para el campo de género
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [dniError, setDniError] = useState<string | null>(null);
    const [celularError, setCelularError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/register/', {
                first_name: firstName,
                last_name: lastName,
                username,
                password,
                dni,
                celular,
                email,
                genero,
            });

            if (response.status === 201) {
                toast.success('Registro exitoso. Por favor, inicia sesión.', { autoClose: 15000 });
                navigate('/login'); // Redirige al usuario a la página de inicio de sesión después del registro exitoso
            } else {
                throw new Error('Error en el registro');
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                const errorData = error.response.data;
                setUsernameError(errorData.username ? errorData.username[0] : null);
                setPasswordError(errorData.password ? errorData.password[0] : null);
                setDniError(errorData.dni ? errorData.dni[0] : null);
                setCelularError(errorData.celular ? errorData.celular[0] : null);
                setEmailError(errorData.email ? errorData.email[0] : null);
            } else {
                toast.error('Error en el registro. Por favor, inténtalo de nuevo.', { autoClose: 15000 });
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
                            Registro
                        </Typography>
                        <form className="register-form" onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                name="firstName"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Nombre de usuario"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={usernameError !== null}
                                helperText={usernameError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electrónico"
                                name="email"
                                autoComplete="email"
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="dni"
                                label="DNI"
                                id="dni"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                error={dniError !== null}
                                helperText={dniError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="celular"
                                label="Celular"
                                id="celular"
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                error={celularError !== null}
                                helperText={celularError}
                            />

                            <FormControlLabel
                                control={
                                    <select
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                        style={{ padding: '10px', fontSize: '16px' }}
                                    >
                                        <option value="">Selecciona tu género</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                }
                                label="Género"
                            />
                            <FormControlLabel
                                control={<Checkbox value="agree" color="primary" />}
                                label="Acepto los términos y condiciones"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarse
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <LinkMui component={Link} to="/login" variant="body2">
                                        Ya tienes una cuenta? Inicia sesión
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

export default Register;
