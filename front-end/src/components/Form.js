import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function GenericForm() {
  const location = useLocation();
  const checkPath = location.pathname === '/login';
  const login = 'common_login';
  const register = 'common_register';

  return (
    <Form>
      {
        !checkPath && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              data-testid="common_register__input-name"
              type="text"
              placeholder="Seu nome"
            />
            <Form.Text className="text-muted" />
          </Form.Group>)
      }

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{!checkPath ? 'Email' : 'Login'}</Form.Label>
        <Form.Control
          data-testid={ `${!checkPath ? register : login}__input-name` }
          type="email"
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
        <Form.Control type="password" placeholder="*******" />
      </Form.Group>
      {checkPath
       && (
         <Button
           data-testid="common_login__button-login"
           variant="primary"
           type="submit"
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
