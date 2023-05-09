import { ListGroup } from 'react-bootstrap';

export default function Checkout() {
  const itens = localStorage.getItem('car');
  const dataItens = JSON.parse(itens) || [];
  const teste = [dataItens];
  console.log(teste[0]);
  return (
    <div>
      {Array.isArray(teste) ? (
        teste.map((item) => (
          <ListGroup key={ item.id } horizontal className="my-2">
            <ListGroup.Item>{item.name}</ListGroup.Item>
            <ListGroup.Item>
              Quantity:
              {' '}
              {item.quantity}
            </ListGroup.Item>
            <ListGroup.Item>
              Unit Value:
              {' '}
              {item.unitValue}
            </ListGroup.Item>
            <ListGroup.Item>
              Total Value:
              {' '}
              {item.totalValue}
            </ListGroup.Item>
          </ListGroup>
        ))
      ) : (
        <p>Não tem itens no carrinho.</p>
      )}
    </div>
  );
}
