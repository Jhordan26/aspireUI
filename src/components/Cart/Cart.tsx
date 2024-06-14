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
  isOpen: boolean;
  toggleDrawer: (open: boolean) => void;
}

const Cart: React.FC<Props> = ({ cartItems, removeFromCart, isOpen, toggleDrawer }) => {
  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, course) => total + parseFloat(course.plan_precio.toString()), 0);
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
              <ListItemText primary="Your cart is empty." />
            </ListItem>
          ) : (
            cartItems.map((course) => (
              <React.Fragment key={course.id}>
                <ListItem>
                  <MDBRow className="align-items-center">
                    <MDBCol md="3">
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
                      <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(course)}>
                        <ShoppingCartIcon />
                      </IconButton>
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
