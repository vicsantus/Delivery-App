import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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

  const valueTotal = cartTotal.toFixed(2).toString().replace('.', ',');

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

  useEffect(() => {
    const calculateCartTotal = () => {
      let total = 0;
      Object.values(quantities).forEach((product) => {
        total += product.totalValue;
      });
      if (total > 0) setIsValueTotal(false);
      setCartTotal(total);
    };
    const dataCar = JSON.stringify(quantities);
    localStorage.setItem('car', dataCar);
    localStorage.setItem('total', valueTotal);

    calculateCartTotal();
  }, [quantities, data, valueTotal]);

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

  return (
    <Row xs={ 1 } md={ 2 } className="g-4">
      {data.map((p, index) => (
        <Col key={ index.id }>
          <Card>
            <Card.Img
              data-testid={ `${customerProducts}__${dataTestid.image}-${p.id}` }
              variant="top"
              style={ { width: '320px', height: '320px' } }
              src={ p.urlImage }
            />
            <Card.Body>
              <Card.Title
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
            <Card.Footer>
              <Button
                onClick={ () => handleRemove(p.id) }
                data-testid={ `${customerProducts}__${dataTestid.rmItem}-${p.id}` }
              >
                -
              </Button>
              <Form>
                <Form.Control
                  data-testid={ `${customerProducts}__${dataTestid.quantity}-${p.id}` }
                  value={ quantities[p.id]?.quantity === undefined ? 0
                    : quantities[p.id]?.quantity }
                  onChange={ (e) => handleQuantityChange(p.id, e.target.value) }
                />
              </Form>

              <Button
                onClick={ () => handleAdd(p.id) }
                data-testid={ `customer_products__button-card-add-item-${p.id}` }
              >
                +
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
      <Button
        onClick={ () => history.push('/customer/checkout') }
        data-testid={ `${customerProducts}__${dataTestid.buttonCart}` }
        disabled={ isValueTotal }
      >
        Ver Carriho
        {' '}
        <span
          data-testid={ `${customerProducts}__${dataTestid.buttonValue}` }
        >
          {valueTotal}
        </span>

      </Button>
    </Row>
  );
}
