import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

export default function Cards() {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const customerProducts = 'customer_products';
  const dataTestid = {
    price: 'element-card-price',
    image: 'img-card-bg-image',
    title: 'element-card-title',
    addItem: 'button-card-add-item',
    rmItem: 'button-card-rm-item',
    quantity: 'input-card-quantity',
  };

  // customer_products__input-card-quantity-1
  // customer_products__input-card-quantity-'][data-testid$='-1'
  // customer_products__input-card-quantity-

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
                {p.price}
                {' '}
                R$
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
                  value={ quantities[p.id] || 0 }
                />
              </Form>

              <Button
                onClick={ () => handleAdd(p.id) }
                data-testid={ `${customerProducts}__${dataTestid.addItem}-${p.id}` }
              >
                +
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
      <Button>Ver Carriho</Button>
    </Row>
  );
}
