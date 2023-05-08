import React from 'react';
import { useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export default function Admin() {
  const location = useLocation();
  const checkPath = location.pathname === '/administrator';

  return (
    <Form>
      {
        !checkPath && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={ (e) => handleChange(e) }
              placeholder="Seu nome"
            />
          </Form.Group>)
      }

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={ (e) => handleChange(e) }
          name="email"
          placeholder="exemplo@exemplo.com"
        />
        <Form.Text className="text-muted" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
      >
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={ (e) => handleChange(e) }
          placeholder="*******"
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
      >
        <Form.Label>Role</Form.Label>
        <Form.Select>
          <option value="1">Administrador</option>
          <option value="2">Seller</option>
          <option value="3">Customer</option>

        </Form.Select>
      </Form.Group>
    </Form>
  );
}
