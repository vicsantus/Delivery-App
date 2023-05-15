import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/CheckoutStyles.css';

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

  async function requestUser() {
    const request = await fetch('http://localhost:3001/users/seller');
    const response = await request.json();
    setSeller(response);
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

  function deletedProduct(item) {
    const updatedArray = newArray.filter((product) => product.id !== item.id);
    const updatedTotal = (newTotal - item.totalValue).toFixed(2);
    console.log(updatedTotal);
    setNewArray(updatedArray);
    setNewTotal(updatedTotal);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${user?.token}`,
  };

  useEffect(() => {
    const objUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(objUser);
    setUser(parsedUser);

    setOrder({
      ...order,
      sellerId: seller[0]?.id,
    });
  }, [seller]);

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
    // console.log('response', response);
    history.push(`/customer/orders/${response}`);
  }

  return (
    <div className="content">
      <h2 className="title">Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>

        </thead>

      </table>
      {Array.isArray(newArray) ? (
        newArray.map((item, index) => (
          <tbody key={ index } id="tbVendas" rules="rows">
            <tr className="itens">
              <td
                className="item"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                className="description"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {item.name}

              </td>

              <td
                className="quantity"
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {item.quantity}
              </td>
              <td
                className="unit-price"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {item.unitValue.toString().replace('.', ',')}
              </td>
              <td
                className="sub-total"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {item.totalValue.toFixed(2).toString().replace('.', ',')}
              </td>

              <button
                className="remove"
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                id={ item.id }
                onClick={ () => deletedProduct(item) }
              >
                Remover
              </button>
            </tr>

          </tbody>
        ))
      ) : (
        <p>Não tem itens no carrinho.</p>
      )}
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        {totalPrice}

      </span>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div className="form-checkout">
        <form>

          <label htmlFor="seller-id">
            Vendedora(o)

            <select
              onChange={ (e) => handleChange(e) }
              name="sellerId"
              data-testid="customer_checkout__select-seller"
            >
              {seller.map((s) => (
                <option key={ s.id } value={ s.id }>{s.name}</option>
              ))}

            </select>
          </label>

          <label htmlFor="adress">
            Endereço para entrega
            <input
              className="adress"
              onChange={ (e) => handleChange(e) }
              name="adress"
              data-testid="customer_checkout__input-address"
              type="test"
              placeholder="Digite o endereço para entrega"
            />
          </label>

          <label htmlFor="number">
            Número
            <input
              className="number"
              name="number"
              onChange={ (e) => handleChange(e) }
              data-testid="customer_checkout__input-address-number"
              type="number"
            />
          </label>
        </form>
        <button
          className="button"
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ () => createOrder() }
        >
          Fazer pedido
        </button>
      </div>

    </div>
  );
}
