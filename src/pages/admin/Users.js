// UsersTable.js
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { async } from 'q';

const Users = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const columns = [
    {
      name: 'Name',
      selector: row => row.userName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Roles',
      selector: row => {
        return row.roles.join(', ')
      },
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button className="text-blue-500" onClick={() => handleEditUser(row.id)}>
            Edit
          </button>
          <button className="text-red-500" onClick={() => handleDeleteUser(row)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEditUser = (userId) => {
    // Redirect to edit user page
    navigate(`/m-admin/user/edit-user/${userId}`);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = async() => {
    // Perform delete action here 
    try {
      const token = localStorage.getItem('token');
      const deleteApi = `http://localhost:8080/api/users/${selectedUser.id}`;

      // Make the DELETE request
      const response = await axios.delete(deleteApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle the response as needed
       fetchUserData();

      // For now, let's just close the confirmation modal
      setDeleteConfirmationVisible(false);
      setSelectedUser(null);
      navigate('/m-admin/users');
    } catch (error) {
      // Handle errors
      console.error('Error deleting data:', error);
    }
  }



  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {

      await fetchUserData();

    }
     fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch roles');
    }
  }

  // For now, let's use sample data
  return (
    <div>
      <Link type='button' to='/m-admin/user/add-user' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add User</Link>
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        responsive
      />

      {deleteConfirmationVisible && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Users;
