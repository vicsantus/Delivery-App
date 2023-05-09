import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

export default function Checkout() {
  const [newArray, setNewArray] = useState([]);
  const [newTotal, setNewTotal] = useState(0);

  const itens = localStorage.getItem('car');
  const dataItens = JSON.parse(itens) || [];
  const arr = Object.values(dataItens);
  const total = localStorage.getItem('total');
  const valueTotal = total.toString().replace(',', '.');
  const teste = newTotal.toString().replace('.', ',');

  useState(() => {
    setNewArray(arr);
    setNewTotal(valueTotal);
  });

  function deletedProduct(item) {
    const updatedArray = newArray.filter((product) => product.id !== item.id);
    const updatedTotal = newTotal - item.totalValue;
    console.log(updatedTotal);
    setNewArray(updatedArray);
    setNewTotal(updatedTotal);
  }

  return (
    <div>
      {Array.isArray(newArray) ? (
        newArray.map((item, index) => (
          <ListGroup key={ index } horizontal className="my-2">
            <ListGroup.Item
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </ListGroup.Item>
            <ListGroup.Item
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {item.name}

            </ListGroup.Item>
            <ListGroup.Item
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {item.quantity}
            </ListGroup.Item>
            <ListGroup.Item
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              {item.unitValue.toString().replace('.', ',')}
            </ListGroup.Item>
            <ListGroup.Item
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              {item.totalValue.toFixed(2).toString().replace('.', ',')}
            </ListGroup.Item>
            <Button
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              id={ item.id }
              onClick={ () => deletedProduct(item) }
            >
              Remover
            </Button>
          </ListGroup>
        ))
      ) : (
        <p>Não tem itens no carrinho.</p>
      )}
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        {teste}

      </span>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vendedora(o)</Form.Label>
          <Form.Select data-testid="customer_checkout__select-seller">
            <option value="">Brunooo</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Endereço para entrega</Form.Label>
          <Form.Control
            data-testid="customer_checkout__input-address"
            type="test"
            placeholder="Endereço"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Número</Form.Label>
          <Form.Control
            data-testid="customer_checkout__input-address-number"
            type="number"
          />
        </Form.Group>
        <Button
          data-testid="customer_checkout__button-submit-order"
          variant="primary"
          type="submit"
        >
          Fazer pedido
        </Button>
      </Form>
    </div>
  );
}
