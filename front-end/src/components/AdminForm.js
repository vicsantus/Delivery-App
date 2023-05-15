import React, { useState, useEffect } from 'react';
import '../styles/AdminFormStyles.css';

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
    } else {
      setRegisterIsDisabled(true);
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
    <div className="main-form">

      <form className="form-container">
        <label htmlFor="name">
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            name="name"
            onChange={ (e) => handleChange(e) }
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            onChange={ (e) => handleChange(e) }
            name="email"
            placeholder="exemplo@exemplo.com"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            onChange={ (e) => handleChange(e) }
            placeholder="*******"
          />
        </label>

        <label htmlFor="role">
          Role
          <select
            data-testid="admin_manage__select-role"
            name="role"
            value={ user.role }
            onChange={ (e) => handleChange(e) }
          >
            <option value="administrator">Administrador</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>

          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          variant="success"
          type="button"
          onClick={ () => buttonRegister() }
          disabled={ registerIsDisabled }
        >
          Cadastrar
        </button>
      </form>
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
