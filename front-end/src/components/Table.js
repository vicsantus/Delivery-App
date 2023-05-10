import PropTypes from 'prop-types';

export default function Table({ users, setUsers }) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function deleteUser(id) {
    setUsers((prevState) => prevState.filter((user) => user.id !== id));
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers,
    });
  }

  return (
    <table>
      <thead>
        <th>Item</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Tipo</th>
        <th>Excluir</th>
      </thead>
      <tbody>
        {users?.map((person, index) => (
          <tr key={ index }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number${index}` }
            >
              {person.id}

            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {person.name}

            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {person.email}

            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {person.role}

            </td>
            <td>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => deleteUser(person.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  users: PropTypes.array,
}.isRequired;
