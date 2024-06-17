import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete'; // Importamos el icono de basurita

interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  plan_precio: string | number;
}

interface Props {
  cartItems: Course[];
  removeFromCart: (course: Course) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleDrawer: (open: boolean) => void;
}

const Cart: React.FC<Props> = ({ cartItems, removeFromCart, clearCart, isOpen, toggleDrawer }) => {
  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, course) => total + parseFloat(course.plan_precio.toString()), 0);
  };

  // Función para contar la cantidad de cada curso en el carrito
  const countItems = (course: Course) => {
    return cartItems.filter(item => item.id === course.id).length;
  };

  // Función para eliminar un curso específico del carrito
  const handleRemoveFromCart = (course: Course) => {
    removeFromCart(course); // Llama a la función removeFromCart pasando el curso seleccionado
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
    >
      <div style={{ width: '100%', maxWidth: '400px', padding: '16px' }}>
        <MDBTypography tag="h5" className="mb-4">
          Shopping Cart
        </MDBTypography>
        <List>
          {cartItems.length === 0 ? (
            <ListItem>
              <ListItemText primary="Tu carrito de compras está vacío." />
            </ListItem>
          ) : (
            cartItems.map((course) => (
              <React.Fragment key={course.id}>
                <ListItem>
                  <MDBRow className="align-items-center">
                    <MDBCol md="1">
                      <IconButton edge="start" aria-label="delete" onClick={() => handleRemoveFromCart(course)}>
                        <DeleteIcon />
                      </IconButton>
                    </MDBCol>
                    <MDBCol md="2">
                      <MDBCardImage
                        src={course.imagen}
                        alt={course.nombre}
                        fluid
                        className="rounded-3"
                        style={{ width: '65px' }}
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBTypography tag="h6" className="mb-1">
                        {course.nombre}
                      </MDBTypography>
                      <MDBTypography tag="p" className="small mb-0">
                        {course.descripcion}
                      </MDBTypography>
                      <MDBTypography tag="p" className="small mb-0">
                        S/ {course.plan_precio}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="3">
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(course)}>
                        <DeleteIcon />
                      </IconButton>
                    </MDBCol>
                    {/* Contador de cantidad del curso */}
                    <MDBCol md="1">
                      <MDBTypography tag="p" className="small mb-0">
                        {countItems(course)}
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
          {cartItems.length > 0 && (
            <>
              <ListItem>
                <MDBTypography tag="h6" className="mb-0">
                  Total: S/ {calculateTotal()}
                </MDBTypography>
              </ListItem>
              <ListItem>
                <MDBTypography tag="p" className="mb-0">
                  Total Items: {cartItems.length}
                </MDBTypography>
              </ListItem>
              <ListItem>
                <MDBBtn block color="danger" className="mt-3" onClick={clearCart}>
                  Clear Cart
                </MDBBtn>
              </ListItem>
              <MDBBtn block color="primary" className="mt-3">
                Checkout
              </MDBBtn>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default Cart;
