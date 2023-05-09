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

      data.forEach((p) => {
        const quantity = quantities[p.id] || 0;
        total += p.price * quantity;
      });
      if (total > 0) setIsValueTotal(false);
      setCartTotal(total);
    };

    calculateCartTotal();
  }, [quantities, data]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAdd = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleRemove = (productId) => {
    setQuantities((prevQuantities) => {
      const quantity = prevQuantities[productId] || 0;
      if (quantity > 0) {
        return {
          ...prevQuantities,
          [productId]: quantity - 1,
        };
      }
      return prevQuantities;
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
                  value={ quantities[p.id] === undefined ? 0 : quantities[p.id] }
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
