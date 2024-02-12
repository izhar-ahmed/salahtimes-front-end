import React from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import useContacts from './../../components/admin/useContacts';

const Contacts = () => {
  const { contacts, loading, error } = useContacts();
  const navigate = useNavigate();

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Subject',
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      sortable: true,
    },
    {
      id: 'createdAt',
      name: 'Created At',
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <Link to={`/m-admin/contact/${row.id}`} className="btn btn-primary mr-2">
            View
          </Link>
          <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    // Implement delete functionality
    // Redirect to contacts page after deletion
    navigate('/contacts');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <DataTable
        title="Contacts"
        columns={columns}
        data={contacts}
        pagination
        highlightOnHover
        defaultSortFieldId="createdAt"
        defaultSortAsc={false}
        responsive
      />
    </div>
  );
};

export default Contacts;
