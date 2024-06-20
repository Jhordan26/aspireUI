import React from 'react';
import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Course } from '../../components/Courses';
import { useAuth } from '../Auth/AuthContext';

interface PayPalComponentProps {
    ventaItems: Course[];
}

const PayPalComponent: React.FC<PayPalComponentProps> = ({ ventaItems }) => {
    const { user } = useAuth(); // Obtener usuario del contexto de autenticación

    const paypalOptions = {
        "client-id": "AStzaGanGIawQet0X34MMznoIXl8yRh_-gmr4M-e6bo9IEF0Lcl0R14UM_FYZ822EsMt_v79BOdJNknA",
        "currency": "USD"
    };

    const handlePaymentSuccess = (ventaId: string) => {
        console.log('Venta registrada correctamente con ID:', ventaId);
    };

    const savePayments = (orderID: string) => {
        const payload = ventaItems.map(course => ({
            usuario_id: user?.id,
            curso_id: course.id,
            monto: course.plan_precio,
            fecha_registro: new Date().toISOString()
        }));

        axios.post('http://localhost:8000/api/save-payments/', { payments: payload })
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
                    const totalAmount = ventaItems.reduce((total, course) => total + parseFloat(course.plan_precio.toString()), 0);
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: totalAmount.toString() // Usar el precio total del carrito
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    if (actions && actions.order && data && data.orderID) {
                        const orderID = data.orderID;
                        savePayments(orderID); // Guardar los pagos con los cursos seleccionados
                    } else {
                        console.error('Error: No se pudo obtener el orderID o actions.order');
                    }
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalComponent;
