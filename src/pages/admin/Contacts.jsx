import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import useContacts from './../../components/admin/useContacts';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import axios from 'axios';
import { deleteContactAPI } from '../../util/util';

const Contacts = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
	const [deleteContactId, setDeleteContactId] = useState(null);
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
          <Link to={`/m-admin/contacts/view-contact/${row.id}`} className="px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1">
            View
          </Link>
          <button className="px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1" onClick={() => handleDeleteClick(row.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Handle delete click
  const handleDeleteClick = (id) => {
    // Implement delete functionality
    setDeleteContactId(id);
    setPopupVisible(true);
    // Redirect to contacts page after deletion
    // navigate('/contacts');
  };

  // Handle cancel delete
	const handleCancelDelete = () => {
		// Close the popup and reset deleteItemId
		setPopupVisible(false);
		setDeleteContactId(null);
	};

  // Handle confirm delete
  const handleConfirmDelete = async () => {
		try {
			const token = localStorage.getItem('token');
			// Make the DELETE request
			await axios.delete(deleteContactAPI+deleteContactId, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			// Handle the response as needed
			setPopupVisible(false);
			setDeleteContactId(null);
			navigate('/m-admin/contacts');
		} catch (error) {
			// Handle errors
			console.error('Error deleting data:', error);
		}
	}

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
      {/* Popup */}
			{isPopupVisible && (
				<DeleteConfirmation onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
			)}
    </div>
  );
};

export default Contacts;
