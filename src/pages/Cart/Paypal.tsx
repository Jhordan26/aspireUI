import React from 'react';
import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalComponentProps {
    nombreCurso: string;
    precioPlan: string | number;
    planId: number;
    userId: number;
    ventaId: number; // ID de la venta generado previamente
    cursos: { id: number, nombre: string, precio: number }[];
}

const PayPalComponent: React.FC<PayPalComponentProps> = ({ nombreCurso, precioPlan, planId, userId, ventaId, cursos = [] }) => {
    const paypalOptions = {
        "client-id": "AStzaGanGIawQet0X34MMznoIXl8yRh_-gmr4M-e6bo9IEF0Lcl0R14UM_FYZ822EsMt_v79BOdJNknA",
        "currency": "USD"
    };

    const handlePaymentSuccess = (ventaId: string) => {
        console.log('Venta registrada correctamente con ID:', ventaId);
    };

    const savePayment = (orderID: string) => {
        if (!Array.isArray(cursos)) {
            console.error('Error: cursos no es un array');
            return;
        }

        const payload = {
            monto: precioPlan, // Ajusta esto según sea necesario
            fecha_registro: new Date().toISOString(),
            venta_id: ventaId,
            cursos: cursos.map(curso => curso.id)
        };

        axios.post('https://jellyfish-app-olbh8.ondigitalocean.app/api/save-payment/', payload)
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                handlePaymentSuccess(orderID);
            })
            .catch(error => {
                console.error('Error al guardar el pago:', error);
            });
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: precioPlan.toString()
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    if (actions && actions.order) {
                        return actions.order.capture().then((details: any) => {
                            const orderID = details.id;
                            savePayment(orderID);
                        }).catch(error => {
                            console.error('Error al capturar el pago:', error);
                        });
                    } else {
                        console.error('Error: actions.order no está definido');
                    }
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalComponent;
