// useUsersTable.js
import { useState } from 'react';


const useUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Define the columns for the DataTable
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Roles',
      selector: 'roles',
      sortable: true,
    },
  ];

  // Function to handle row selection
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  // Define the DataTable options
  const tableOptions = {
    selectableRows: 'multiple',
    selectableRowsHighlight: true,
    onSelectedRowsChange: handleRowSelected,
  };

  return { users, setUsers, columns, selectedRows, tableOptions };
};

export default useUsersTable;
