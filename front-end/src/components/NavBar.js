import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [user, setUser] = useState();
  const customerProducts = 'customer_products';
  const dataTestid = {
    products: 'element-navbar-link-products',
    orders: 'element-navbar-link-orders',
    fullName: 'element-navbar-user-full-name',
    logout: 'element-navbar-link-logout',
  };

  const checkPath = pathname === '/customer/products';

  useEffect(() => {
    const objUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(objUser);
    setUser(parsedUser);
  }, []);

  function logout() {
    localStorage.removeItem('user');
    history.push('/login');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>

        {checkPath && (
          <Navbar.Brand
            href="/customer/products"
            data-testid={ `${customerProducts}__${dataTestid.products}` }
          >
            PRODUTOS
          </Navbar.Brand>)}
        <Navbar.Brand
          href={ checkPath ? '/customer/orders' : '/seller/orders' }
          data-testid={ `${customerProducts}__${dataTestid.orders}` }
        >
          {checkPath ? 'MEUS PEDIDOS' : 'PEDIDOS'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link
              data-testid={ `${customerProducts}__${dataTestid.fullName}` }
            >
              {user?.name}
            </Nav.Link>
            <Button
              eventKey={ 2 }
              data-testid={ `${customerProducts}__${dataTestid.logout}` }
              onClick={ () => logout() }
            >
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
