import React, { useEffect, useState } from 'react';
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
    <div xs={ 1 } md={ 2 } className="g-4">
      <div className="containerPai">
        {data.map((p, index) => (
          <div
            className="card"
            key={ index.id }
          >
            <img
              alt="card-img-top"
              data-testid={ `${customerProducts}__${dataTestid.image}-${p.id}` }
              className="card-img-top"
              variant="top"
              style={ { width: 'auto' } }
              src={ p.urlImage }
            />
            <div className="card-body">
              <div
                className="card-title"
                data-testid={ `${customerProducts}__${dataTestid.title}-${p.id}` }
              >
                {p.name}
              </div>
              <p
                data-testid={ `${customerProducts}__${dataTestid.price}-${p.id}` }
              >
                {p.price.toString().replace('.', ',')}
              </p>
            </div>
            <div className="cardFooter">
              <button
                type="button"
                className="buttonSub"
                onClick={ () => handleRemove(p.id) }
                data-testid={ `${customerProducts}__${dataTestid.rmItem}-${p.id}` }
              >
                -
              </button>
              <form className="quantity">
                <input
                  className="value"
                  data-testid={ `${customerProducts}__${dataTestid.quantity}-${p.id}` }
                  value={ quantities[p.id]?.quantity === undefined
                    ? 0 : quantities[p.id]?.quantity }
                  onChange={ (e) => handleQuantityChange(p.id, e.target.value) }
                />
              </form>

              <button
                type="button"
                className="buttonSub"
                onClick={ () => handleAdd(p.id) }
                data-testid={ `${customerProducts}__${dataTestid.addItem}-${p.id}` }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={ handleClickCart }
        data-testid={ `${customerProducts}__${dataTestid.buttonCart}` }
        disabled={ isValueTotal }
        className="btn-order"
      >
        Ver Carrinho
        {' '}
        <span
          data-testid={ `${customerProducts}__${dataTestid.buttonValue}` }
        >
          {`R$${valueTotal}`}

        </span>
      </button>
    </div>
  );
}
