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

      <spam
        data-testid={ !checkPath ? `${register}__${dataTestid.invalidRedister}`
          : `${login}__${dataTestid.invalidEmail}` }
      >
        {!checkPath ? 'Erro para registrar a conta' : 'Usuario ou senha incorreta'}
      </spam>
    </div>
  );
}
