import { useEffect, useState } from 'react';
import AdminForm from '../components/AdminForm';
import Table from '../components/Table';

export default function Admin() {
  const [users, setUsers] = useState([]);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const getUser = async () => {
      const request = await fetch('http://localhost:3001/users', {
        method: 'GET',
        mode: 'cors',
        headers,
      });
      const response = await request.json();
      setUsers(response);
    };
    getUser();
  }, []);

  return (
    <div>
      <AdminForm />
      <Table users={ users } setUsers={ setUsers } />
    </div>
  );
}
