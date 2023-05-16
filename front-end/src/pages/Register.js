import GenericForm from '../components/GenericForm';
import deliveryLogo from '../images/delivery_logo.png';

export default function Register() {
  return (
    <div className="div_login">
      <img src={ deliveryLogo } alt="logo" />
      <GenericForm />
    </div>
  );
}
