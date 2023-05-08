import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import DeliveryContext from '../context/DeliveryContext';

export default function NavBar() {
  // const history = useHistory();
  // const { location: { pathname } } = history;
  const { dataUser } = useContext(DeliveryContext);
  const customerProducts = 'customer_products';
  const dataTestid = {
    products: 'element-navbar-link-products',
    orders: 'element-navbar-link-orders',
    fullName: 'element-navbar-user-full-name',
    logout: 'element-navbar-link-logout',
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>

        <Navbar.Brand
          href="#home"
          data-testid={ `${customerProducts}__${dataTestid.products}` }
        >
          PRODUTOS
        </Navbar.Brand>
        <Navbar.Brand
          href="#home"
          data-testid={ `${customerProducts}__${dataTestid.orders}` }
        >
          MEUS PEDIDOS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link
              data-testid={ `${customerProducts}__${dataTestid.fullName}` }
            >
              {dataUser?.name}
            </Nav.Link>
            <Nav.Link
              eventKey={ 2 }
              data-testid={ `${customerProducts}__${dataTestid.logout}` }
              href="/login"
            >
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
