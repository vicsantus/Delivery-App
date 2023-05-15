import PropTypes from 'prop-types';
import '../styles/AdminTableStyles.css';

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
    <div className="table-main">
      <h5>Lista de usuários</h5>
      <table className="table-container">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody className="tbody-container">
          {users?.map((person, index) => (
            <tr key={ index }>
              <td
                className="id-user"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {person.id}

              </td>
              <td
                className="name-user"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {person.name}

              </td>
              <td
                className="email-user"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {person.email}

              </td>
              <td
                className="role-user"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {person.role}

              </td>
              <td className="button-exclude-container">
                <button
                  type="button"
                  className="button-exclude"
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
    </div>
  );
}

Table.propTypes = {
  users: PropTypes.array,
}.isRequired;
