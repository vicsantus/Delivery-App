import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function GenericForm() {
  const location = useLocation();
  const checkPath = location.pathname === '/login';
  const login = 'common_login';
  const register = 'common_register';
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    const SIX = 6;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length >= SIX;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.email, user.password]);

  return (
    <Form>
      {
        !checkPath && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              data-testid="common_register__input-name"
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
          data-testid={ `${!checkPath ? register : login}__input-name` }
          type="email"
          onChange={ (e) => handleChange(e) }
          name="email"
          placeholder="exemplo@exemplo.com"
        />
        <Form.Text className="text-muted" />
      </Form.Group>

      <Form.Group
        data-testid={ `${!checkPath ? register : login}__input-password` }
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
      {checkPath
     && (
       <Button
         data-testid="common_login__button-login"
         variant="primary"
         type="submit"
         disabled={ disabled }
       >
         Login
       </Button>)}
      <Button
        data-testid={ `${!checkPath ? register : login}__button-register` }
        variant="primary"
        type="submit"
      >
        {checkPath ? 'Ainda não tenho cadastro' : 'CADASTRAR' }
      </Button>
      <spam
        data-testid={ !checkPath ? `${register}__element-invalid-register`
          : `${login}__element-invalid-email` }
      >
        Mensagem de Erro
      </spam>
    </Form>
  );
}
