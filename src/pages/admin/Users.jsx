// UsersTable.js
import { useEffect, useState, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/solid'
import { consts } from '@/util/APIEndpoints';
import { getLocalStorageItem } from '@/util/common';

const Users = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const navigate = useNavigate();
  const token = getLocalStorageItem('token');

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
          <button className="px-4 py-1.5 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handleEditUser(row.id)}>
            Edit
          </button>
          <button className="px-4 py-1.5 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handleDeleteUser(row)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEditUser = (userId) => {
    // Redirect to edit user page
    navigate(`/m-admin/users/edit-user/${userId}`);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = async () => {
    // Perform delete action here 
    try {
      const token = getLocalStorageItem('token');
      // Make the DELETE request
      await axios.delete(consts.DELETE_USER_API(selectedUser.id), {
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
  
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(consts.GET_ALL_USER_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch roles');
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    }
    fetchData();
  }, [fetchUserData]);


  // For now, let's use sample data
  return (
    <div>
      <Link type='button' to='/m-admin/users/add-user' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <PlusIcon className='h-5 w-5 text-white-500 inline pb-1' />
        Add User</Link>
      {error && <div className=''>${error}</div> }
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
