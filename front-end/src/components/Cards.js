import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../styles/Cards.css';

export default function Cards() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isValueTotal, setIsValueTotal] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const customerProducts = 'customer_products';
  const dataTestid = {
    price: 'element-card-price',
    image: 'img-card-bg-image',
    title: 'element-card-title',
    addItem: 'button-card-add-item',
    rmItem: 'button-card-rm-item',
    quantity: 'input-card-quantity',
    buttonCart: 'button-cart',
    buttonValue: 'checkout-bottom-value',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateCartTotal = () => {
    let total = 0;
    Object.values(quantities).forEach((product) => {
      total += product.totalValue;
    });
    if (total > 0) {
      setIsValueTotal(false);
    } else {
      setIsValueTotal(true);
    }
    setCartTotal(total);
  };

  useEffect(() => {
    calculateCartTotal();
    const dataCar = JSON.stringify(quantities);
    localStorage.setItem('car', dataCar);
  }, [quantities]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => {
      const product = data.find((p) => p.id === productId);
      const total = parseInt(quantity, 10) * product.price;
      return {
        ...prevQuantities,
        [productId]: {
          ...prevQuantities[productId],
          quantity: parseInt(quantity, 10),
          totalValue: total,
        },
      };
    });
  };

  const handleAdd = (productId) => {
    const product = data.find((p) => p.id === productId);
    setQuantities((prevQuantities) => {
      const prevQuantity = prevQuantities[productId]?.quantity || 0;
      const quantity = prevQuantity + 1;
      const total = quantity * product.price;
      return {
        ...prevQuantities,
        [productId]: {
          id: productId,
          quantity,
          unitValue: product.price,
          totalValue: total,
          name: product.name,
        },
      };
    });
  };

  const handleRemove = (productId) => {
    setQuantities((prevQuantities) => {
      const prevQuantity = prevQuantities[productId]?.quantity || 0;
      if (prevQuantity > 0) {
        const quantity = prevQuantity - 1;
        const product = data.find((p) => p.id === productId);
        const total = quantity * product.price;
        return {
          ...prevQuantities,
          [productId]: {
            ...prevQuantities[productId],
            quantity,
            totalValue: total,
          },
        };
      }

      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[productId];
      return updatedQuantities;
    });
  };

  const valueTotal = cartTotal.toFixed(2).toString().replace('.', ',');

  const handleClickCart = () => {
    localStorage.setItem('total', valueTotal);
    history.push('/customer/checkout');
  };

  return (
    <Row xs={ 1 } md={ 2 } className="g-4">
      <div className="containerPai">
        {data.map((p, index) => (
          <Col
            class="card"
            key={ index.id }
          >
            <Card.Img
              data-testid={ `${customerProducts}__${dataTestid.image}-${p.id}` }
              class="card-img-top"
              variant="top"
              style={ { width: '250px', height: '250px' } }
              src={ p.urlImage }
            />
            <Card.Body class="card-body">
              <Card.Title
                class="card-title"
                data-testid={ `${customerProducts}__${dataTestid.title}-${p.id}` }
              >
                {p.name}
              </Card.Title>
              <Card.Text
                data-testid={ `${customerProducts}__${dataTestid.price}-${p.id}` }
              >
                {p.price.toString().replace('.', ',')}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="cardFooter">
              <Button
                className="buttonSub"
                onClick={ () => handleRemove(p.id) }
                data-testid={ `${customerProducts}__${dataTestid.rmItem}-${p.id}` }
              >
                -
              </Button>
              <Form className="quantity">
                <Form.Control
                  className="value"
                  data-testid={ `${customerProducts}__${dataTestid.quantity}-${p.id}` }
                  value={ quantities[p.id]?.quantity === undefined
                    ? 0 : quantities[p.id]?.quantity }
                  onChange={ (e) => handleQuantityChange(p.id, e.target.value) }
                />
              </Form>

              <Button
                type="button"
                className="buttonSub"
                onClick={ () => handleAdd(p.id) }
                data-testid={ `${customerProducts}__${dataTestid.addItem}-${p.id}` }
              >
                +
              </Button>
            </Card.Footer>
          </Col>
        ))}
      </div>
      <Button
        type="button"
        onClick={ handleClickCart }
        data-testid={ `${customerProducts}__${dataTestid.buttonCart}` }
        disabled={ isValueTotal }
        class="btn-primary"
      >
        Ver Carrinho
        {' '}
        <span
          data-testid={ `${customerProducts}__${dataTestid.buttonValue}` }
        >
          {`R$${valueTotal}`}

        </span>
      </Button>
    </Row>
  );
}
