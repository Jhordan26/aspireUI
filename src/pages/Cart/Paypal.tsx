import React from 'react';
import axios from 'axios';  // Importa axios para hacer peticiones HTTP
import { PayPalButtons, PayPalScriptProvider, PayPalScriptProviderOptions } from '@paypal/react-paypal-js';

interface PayPalComponentProps {
	nombreCurso: string;
	precioPlan: string | number;
}

const PayPalComponent: React.FC<PayPalComponentProps> = ({ nombreCurso, precioPlan }) => {
	const paypalOptions: PayPalScriptProviderOptions = {
		"client-id": "AStzaGanGIawQet0X34MMznoIXl8yRh_-gmr4M-e6bo9IEF0Lcl0R14UM_FYZ822EsMt_v79BOdJNknA"
	};

	const handlePaymentSuccess = (ventaId: number) => {
		// Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
		console.log('Venta registrada correctamente con ID:', ventaId);
	};

	const savePayment = (ventaId: number) => {
		axios.post('https://jellyfish-app-olbh8.ondigitalocean.app/api/save-payment/', { venta_id: ventaId })
			.then(response => {
				console.log('Respuesta del servidor:', response.data);
				handlePaymentSuccess(ventaId);
			})
			.catch(error => {
				console.error('Error al guardar el pago:', error);
				// Aquí puedes manejar errores de guardado
			});
	};

	return (
		<PayPalScriptProvider options={paypalOptions}>
			<PayPalButtons
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [{
							amount: {
								currency_code: 'USD',
								value: precioPlan.toString(),
							},
							description: nombreCurso
						}],
						intent: 'CAPTURE'
					});
				}}
				onApprove={(data, actions) => {
					if (actions && actions.order) {
						return actions.order.capture().then((details: any) => {
							// Aquí debes asegurarte de obtener el ID correcto
							const ventaId = details.purchase_units[0].custom_id; // Asegúrate de ajustar esto según la respuesta de PayPal

							// Luego, envía este ID a tu API
							const payload = {
								venta_id: parseInt(ventaId),  // Asegúrate de convertir ventaId a un número entero si es necesario
								monto: details.purchase_units[0].amount.value,
								fecha_registro: new Date().toISOString(),
							};

							// Aquí llamas a tu API para guardar el pago
							fetch('https://jellyfish-app-olbh8.ondigitalocean.app/api/save-payment/', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(payload),
							})
								.then(response => response.json())
								.then(data => {
									console.log('Pago guardado correctamente:', data);
									// Aquí puedes manejar cualquier lógica adicional después de guardar el pago
								})
								.catch(error => {
									console.error('Error al guardar el pago:', error);
									// Manejar errores de guardar el pago
								});
						}).catch(error => {
							console.error('Error al capturar el pago:', error);
							// Manejar errores de captura de pago
						});
					} else {
						console.error('Error: actions.order no está definido');
						// Manejar el caso donde actions.order no está disponible
						return Promise.reject(new Error('No se pudo capturar la orden'));
					}
				}}
			/>
		</PayPalScriptProvider>
	);
};

export default PayPalComponent;
