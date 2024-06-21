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
import ModalComponent from '../../components/ModalComponent';

const defaultTheme = createTheme();

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalMessage, setModalMessage] = useState<string>('');

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setEmailError(null); // Limpiar errores previos
		setPasswordError(null); // Limpiar errores previos

		try {
			const response = await axios.post('login/', { email, password });

			if (response.status === 200) {
				const { token, user } = response.data;
				login(token, user);
				toast.success('Inicio de sesión exitoso: ¡Bienvenido!', { autoClose: 15000 });
				navigate('/home');
				localStorage.setItem('token', token);
				localStorage.setItem('id', user.id.toString());
			} else {
				throw new Error('Error al iniciar sesión');
			}
		} catch (error: any) {
			if (error.response) {
				if (error.response.status === 400) {
					if (error.response.data.message === 'Incorrect password') {
						setPasswordError('Contraseña incorrecta');
						setModalMessage('Las credenciales son incorrectas, inténtelo nuevamente');
						setModalOpen(true);
					} else if (error.response.data.message === 'User not found') {
						setEmailError('Correo electrónico no encontrado');
					}
				} else if (error.response.status === 500) {
					setModalMessage('Error del Servidor');
					setModalOpen(true);
				}
			} else {
				toast.error('Error al iniciar sesión, por favor intente nuevamente', { autoClose: 15000 });
			}
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: '100vh', backgroundColor: '#0D1A2E' }}>
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(public/img/aspireLogo.png)',
						backgroundRepeat: 'no-repeat',
						backgroundSize: '70%', // Ajusta el tamaño de la imagen
						backgroundPosition: 'center',
						backgroundPositionX: '10rem', // Mueve la imagen hacia la izquierda
						backgroundPositionY: 'center', // Centro verticalmente
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						zIndex: 1,
						paddingTop: '4rem',
						marginBottom: '-4rem', // Ajuste para compensar el padding top
						paddingRight: '-4rem',
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
			{modalOpen && (
				<ModalComponent
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					message={modalMessage}
				/>
			)}
		</ThemeProvider>
	);
};

export default Login;
