import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GenericForm from '../components/GenericForm';

export default function Login() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) return history.push('/customer/products');
  });
  return (
    <div>
      <GenericForm />
    </div>
  );
}
