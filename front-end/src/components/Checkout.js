import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Checkout() {
  const history = useHistory();

  const [newArray, setNewArray] = useState([]);
  const [newTotal, setNewTotal] = useState(0);
  const itens = localStorage.getItem('car');
  const dataItens = JSON.parse(itens) || [];
  const arr = Object.values(dataItens);
  const total = localStorage.getItem('total');
  const valueTotal = total.toString().replace(',', '.');
  const totalPrice = newTotal.toString().replace('.', ',');
  const [seller, setSeller] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState({});

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function requestUser() {
    const request = await fetch('http://localhost:3001/users/seller');
    const response = await request.json();
    setSeller(response);
  }

  async function createOrder() {
    const data = {
      userId: user.id,
      sellerId: order.sellerId,
      totalPrice: totalPrice.toString().replace(',', '.'),
      deliveryAddress: order.adress,
      deliveryNumber: order.number,
      products: arr,
    };
    const request = await fetch('http://localhost:3001/sales', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log('response', response[0].id);
    history.push(`/customer/orders/${response[0].id}`);
  }

  useState(() => {
    setNewArray(arr);
    setNewTotal(valueTotal);
    requestUser();
  });

  function handleChange({ target }) {
    setOrder({
      ...order,
      [target.name]: target.value,

    });
  }

  useEffect(() => {
    const objUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(objUser);
    setUser(parsedUser);

    setOrder({
      ...order,
      sellerId: seller[0]?.id,
    });
  }, [seller]);

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
        {totalPrice}

      </span>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vendedora(o)</Form.Label>
          <Form.Select
            onChange={ (e) => handleChange(e) }
            name="sellerId"
            data-testid="customer_checkout__select-seller"
          >
            {seller.map((s) => (
              <option key={ s.id } value={ s.id }>{s.name}</option>
            ))}

          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Endereço para entrega</Form.Label>
          <Form.Control
            onChange={ (e) => handleChange(e) }
            name="adress"
            data-testid="customer_checkout__input-address"
            type="test"
            placeholder="Endereço"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Número</Form.Label>
          <Form.Control
            name="number"
            onChange={ (e) => handleChange(e) }
            data-testid="customer_checkout__input-address-number"
            type="number"
          />
        </Form.Group>
      </Form>
      <Button
        data-testid="customer_checkout__button-submit-order"
        variant="primary"
        type="button"
        onClick={ () => createOrder() }
      >
        Fazer pedido
      </Button>
    </div>
  );
}
