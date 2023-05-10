import AdminForm from '../components/AdminForm';
import Table from '../components/Table';

export default function Admin() {
  return (
    <div>
      <AdminForm />
      <Table users={ users } />
    </div>
  );
}
