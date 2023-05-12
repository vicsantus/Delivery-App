import { useLocation, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import '../styles/GenericFormStyles.css';
import DeliveryContext from '../context/DeliveryContext';

export default function GenericForm() {
  const history = useHistory();
  const location = useLocation();
  const checkPath = location.pathname === '/login';
  const login = 'common_login';
  const register = 'common_register';
  const [disabled, setDisabled] = useState(true);
  const [hiddenMessage, setHiddenMessage] = useState(false);
  const [registerIsDisabled, setRegisterIsDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
  });
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const { setDataUser } = useContext(DeliveryContext);

  const dataTestid = {
    name: 'input-name',
    password: 'input-password',
    email: 'input-email',
    buttonLogin: 'button-login',
    buttonRegister: 'button-register',
    invalidRedister: 'element-invalid_register',
    invalidEmail: 'element-invalid-email',
  };

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  async function requestLogin() {
    const data = {
      email: user.email,
      password: user.password,
    };
    const request = await fetch('http://localhost:3001/login', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    });

    const response = await request.text();
    const json = response === '' ? {} : JSON.parse(response);
    const userString = JSON.stringify(json);
    localStorage.setItem('user', userString);
    return json;
  }

  async function verifyLogin() {
    const responseUser = await requestLogin();
    setDataUser(responseUser);
    if (responseUser.menssagem) {
      setHiddenMessage(true);
    }
    if (responseUser.role === 'administrator') {
      return history.push('/adminitrator');
    }
    if (responseUser.role === 'seller') {
      return history.push('/seller/orders');
    }
    if (responseUser.role === 'customer') {
      return history.push('/customer/products');
    }
    setHiddenMessage(true);
  }

  function handleClick() {
    requestLogin();
    verifyLogin();
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

  async function registerUser() {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'customer',
    };
    const request = await fetch('http://localhost:3001/register', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    });
    const response = await request.json();
    const isUser = JSON.stringify(response);
    localStorage.setItem('user', isUser);
    if (response.message === 'Email already registered') {
      return setHiddenMessage(true);
    }
    return history.push('/customer/products');
  }

  function buttonRegister() {
    if (checkPath) {
      return history.push('/register');
    }
    return registerUser();
  }

  return (
    <div className="form">
      <Form>
        {
          !checkPath && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                data-testid={ `${register}__${dataTestid.name}` }
                type="text"
                name="name"
                onChange={ (e) => handleChange(e) }
                placeholder="Seu nome"
              />
            </Form.Group>)
        }

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{!checkPath ? 'Email' : 'Login'}</Form.Label>
          <Form.Control
            data-testid={ `${!checkPath ? register : login}__${dataTestid.email}` }
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
            data-testid={ `${!checkPath ? register : login}__${dataTestid.password}` }
            name="password"
            onChange={ (e) => handleChange(e) }
            placeholder="*******"
          />
        </Form.Group>
      </Form>
      <div className="d-grid gap-2">
        {checkPath
           && (
             <Button
               data-testid={ `${login}__${dataTestid.buttonLogin}` }
               variant="success"
               type="submit"
               disabled={ disabled }
               onClick={ () => handleClick() }
             >
               Login
             </Button>)}

        <Button
          data-testid={ `${!checkPath ? register
            : login}__${dataTestid.buttonRegister}` }
          variant="success"
          type="submit"
          onClick={ () => buttonRegister() }
          disabled={ !checkPath && registerIsDisabled }
        >
          {checkPath ? 'Ainda não tenho cadastro' : 'CADASTRAR' }
        </Button>

      </div>

      {hiddenMessage
      && (
        <spam
          data-testid={ !checkPath ? `${register}__${dataTestid.invalidRedister}`
            : `${login}__${dataTestid.invalidEmail}` }
        >
          {!checkPath ? 'Email ja cadastrado' : 'Usuario ou senha incorreta'}
        </spam>) }
    </div>
  );
}
