import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GenericForm from '../components/GenericForm';

export default function Login() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'customer') {
      return history.push('/customer/products');
    }
    if (user?.role === 'seller') {
      return history.push('/seller/orders');
    }
    if (user?.role === 'administrator') {
      return history.push('/admin/manage');
    }
  });
  return (
    <div>
      <GenericForm />
    </div>
  );
}
