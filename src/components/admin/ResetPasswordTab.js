import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ResetPasswordTab = ({ token }) => {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('API_ENDPOINT/reset-password', values, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setResetSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col">
      <div style={{ fontWeight: "400" }} className="evaFvq">Reset Password</div>
      {resetSuccess ? (
        <p>Password reset successfully!</p>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-1/3">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">New Password:</label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
                className="mt-1 p-2 w-full border rounded"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Confirm New Password:</label>
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                className="mt-1 p-2 w-full border rounded"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500">{formik.errors.confirmPassword}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {formik.isSubmitting ? 'Submitting...' : 'Reset Password'}
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordTab;
