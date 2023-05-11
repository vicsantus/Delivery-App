import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

export default function AdminForm() {
  const [registerIsDisabled, setRegisterIsDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const { dataUser } = useContext(DeliveryContext);
  const [userFound, setUserFound] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Customer',
  });
  const headersPattern = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

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

  async function buttonRegister() {
    const { token } = dataUser;
    console.log(token);
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    const headers = { Authorization: token, ...headersPattern };
    const request = await fetch('http://localhost:3001/admin', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    });
    const response = await request.json();
    if (response.message === 'Email already registered') return setUserFound(true);
  }

  return (
    <div>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            data-testid="admin_manage__input-name"
            type="text"
            name="name"
            onChange={ (e) => handleChange(e) }
            placeholder="Seu nome"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            data-testid="admin_manage__input-email"
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
            data-testid="admin_manage__input-password"
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
            data-testid="admin_manage__select-role"
            name="role"
            value={ user.role }
            onChange={ (e) => handleChange(e) }
          >
            <option value="Administrador">Administrador</option>
            <option value="Seller">Seller</option>
            <option value="Customer">Customer</option>

          </Form.Select>
        </Form.Group>
        <Button
          data-testid="admin_manage__button-register"
          variant="success"
          type="submit"
          onClick={ () => buttonRegister() }
          disabled={ registerIsDisabled }
        >
          Cadastrar
        </Button>
      </Form>
      {userFound
      && (
        <p
          data-testid="admin_manage__element-invalid-register"
        >
          Você já possui cadastro

        </p>)}
    </div>

  );
}
