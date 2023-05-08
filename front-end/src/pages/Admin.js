import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Admin() {
  const [registerIsDisabled, setRegisterIsDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Administrador',
  });

  function handleChange({ target }) {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  useEffect(() => {
    const SIX = 6;
    const TWELVE = 12;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length >= SIX;
    const nameCheck = user.name.length >= TWELVE;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (!disabled && nameCheck) {
      setRegisterIsDisabled(false);
    }
  }, [user.email, user.password, user.name, disabled]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={ (e) => handleChange(e) }
          placeholder="Seu nome"
        />
      </Form.Group>
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
        <Form.Select
          name="role"
          value={ user.role }
        >
          <option value="Administrador">Administrador</option>
          <option value="Seller">Seller</option>
          <option value="Customer">Customer</option>

        </Form.Select>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        // onClick={ () => buttonRegister() }
        disabled={ registerIsDisabled }
      >
        Cadastrar
      </Button>
    </Form>
  );
}
