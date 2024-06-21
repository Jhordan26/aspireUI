import React from 'react';
import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Course } from '../../components/Courses';
import { useAuth } from '../Auth/AuthContext';

interface PayPalComponentProps {
    ventaItems: Course[];
    cursoIds: number[];
    currency: string; // Moneda que se pasará desde el componente padre
}

const PayPalComponent: React.FC<PayPalComponentProps> = ({ ventaItems, cursoIds, currency }) => {
    const { user } = useAuth();

    const paypalOptions = {
        clientId: "AStzaGanGIawQet0X34MMznoIXl8yRh_-gmr4M-e6bo9IEF0Lcl0R14UM_FYZ822EsMt_v79BOdJNknA",
        currency: currency // Usar la moneda proporcionada desde las props
    };

    const handlePaymentSuccess = (ventaId: string) => {
        console.log('Venta registrada correctamente con ID:', ventaId);
    };

    const savePayments = async (orderID: string) => {
        const payload = ventaItems.map((course, index) => ({
            usuario_id: user?.id,
            curso_id: course.id,  // Aquí aseguras que cada curso tenga su propio curso_id
            monto: course.plan_precio,
            fecha_registro: new Date().toISOString()
        }));
    
        try {
            const response = await axios.post('https://jellyfish-app-olbh8.ondigitalocean.app/api/save-payment/', { payments: payload });
            console.log('Respuesta del servidor:', response.data);
            handlePaymentSuccess(orderID);
        } catch (error) {
            console.error('Error al guardar el pago:', error);
        }
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    const totalAmount = ventaItems.reduce((total, course) => total + parseFloat(course.plan_precio.toString()), 0);
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: {
                                currency_code: currency, // Usar la moneda proporcionada desde las props
                                value: totalAmount.toFixed(2) // Asegurar que el valor sea válido
                            }
                        }]
                    });
                }}
                onApprove={async (data, actions) => {
                    if (actions && actions.order && data && data.orderID) {
                        const orderID = data.orderID;
                        await savePayments(orderID);
                    } else {
                        console.error('Error: No se pudo obtener el orderID o actions.order');
                    }
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalComponent;
