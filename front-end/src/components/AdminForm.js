import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function AdminForm() {
  const [registerIsDisabled, setRegisterIsDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [dataUser, setDataUser] = useState();
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setDataUser(JSON.parse(user));
  }, []);

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'administrator',
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

  async function buttonRegister() {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: dataUser.token,
    };

    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    const request = await fetch('http://localhost:3001/admin', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log('oi', response);
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
            <option value="administrator">Administrador</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>

          </Form.Select>
        </Form.Group>
        <Button
          data-testid="admin_manage__button-register"
          variant="success"
          type="button"
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
