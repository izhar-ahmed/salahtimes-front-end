// useUserForm.js
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { addUserAPI, getRoleAPI } from '../../util/util';

const useUserForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

	const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(getRoleAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        setError('Failed to fetch roles');
      }
    };

    fetchRoles();
  }, [token]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    roleIds: Yup.array().min(1, 'Select at least one role').required('Roles are required'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    roleIds: [],
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(addUserAPI, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
				throw new Error(response.data.message || 'Failed to edit user');
      }
			
			// Navigate to the list page after successful edit
			navigate('/m-admin/users');

      // Reset form on successful submission
      formik.resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return { formik, loading, error, roles };
};

export default useUserForm;
