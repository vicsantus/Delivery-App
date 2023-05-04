import { useLocation, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import '../styles/GenericFormStyles.css';

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

  const dataTestid = {
    name: 'input_name',
    password: 'input_password',
    buttonLogin: 'button_login',
    buttonRegister: 'button_register',
    invalidRedister: 'element-invalid-register',
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await request.text();
    const json = response === '' ? {} : JSON.parse(response);
    return json;
  }

  async function verifyLogin() {
    const responseUser = await requestLogin();
    console.log(responseUser);
    if (responseUser.menssagem) {
      setHiddenMessage(true);
    }
    if (responseUser.role === 'administrator') {
      return history.push('/adminitrator');
    }
    if (responseUser.role === 'seller') {
      return history.push('/seller');
    }
    return history.push('/costumer');
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
    }
  }, [user.email, user.password, user.name, disabled]);

  function buttonRegister() {
    history.push('/register');
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
            data-testid={ `${!checkPath ? register : login}__${dataTestid.name}` }
            type="email"
            onChange={ (e) => handleChange(e) }
            name="email"
            placeholder="exemplo@exemplo.com"
          />
          <Form.Text className="text-muted" />
        </Form.Group>

        <Form.Group
          data-testid={ `${!checkPath ? register : login}__${dataTestid.password}` }
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
          {!checkPath ? 'Erro para registrar a conta' : 'Usuario ou senha incorreta'}
        </spam>) }
    </div>
  );
}
