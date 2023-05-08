import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import DeliveryContext from '../context/DeliveryContext';

export default function NavBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const checkPath = pathname === '/client';
  const { dataUser } = useContext(DeliveryContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        {checkPath && (
          <Navbar.Brand
            href="#home"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </Navbar.Brand>)}
        <Navbar.Brand
          href="#home"
          data-testid="customer_products__element-navbar-link-orders"
        >
          {checkPath ? 'MEUS PEDIDOS' : 'PEDIDOS'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {dataUser?.name}
            </Nav.Link>
            {/* {
              arrayDataUser?.map((user) => (
                <Nav.Link
                  key={ user.id }
                  data-testid="customer_products__element-navbar-user-full-name"
                >
                  {user.name}
                </Nav.Link>
              ))
            } */}
            <Nav.Link
              eventKey={ 2 }
              data-testid="customer_products__element-navbar-link-logout"
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
