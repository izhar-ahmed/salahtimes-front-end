// useEditUserForm.js
import { useState, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { consts } from '@/util/APIEndpoints';
import { getLocalStorageItem } from '@/util/common';

const useEditUserForm = (userId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const token = getLocalStorageItem('token'); // Assuming the token is stored in localStorage
  const navigate = useNavigate();

  const initialValues = useMemo(() => ({
    name: user?.userName || '',
    email: user?.email || '',
    password: '',
    roleIds: user?.roles || [],
  }), [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(consts.GET_USER_API(userId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setUser(response.data);
        initialValues.name = response.data.userName
        initialValues.email = response.data.email
        initialValues.roleIds = response.data.roles
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('Failed to fetch user');
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(consts.GET_ROLE_API, {
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

    fetchUser();
    fetchRoles();
  }, [userId, token, initialValues]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    roleIds: Yup.array().min(1, 'Select at least one role').required('Roles are required'),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(consts.EDIT_USER_API(userId), values, {
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

  return { formik, user, loading, error, roles };
};

export default useEditUserForm;
