import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [isValidCode, _] = useState(true);
  const { code } = useParams();

  useEffect(() => {}, [code]);

  const initialValues = {
    password: '',
    confirmPassword: '',
		code: '',
  };

  const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/reset-password', { code, ...values });
      console.log(response.data.message); // Log success message or handle as needed
      setSubmitting(false);
    } catch (error) {
      if (error.response) {
        setErrors({ password: error.response.data.message });
      } else {
        setErrors({ password: 'Something went wrong. Please try again later.' });
      }
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="bg-gray-50 light:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow light:border md:mt-0 sm:max-w-md xl:p-0 light:bg-gray-800 light:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white">
              {isValidCode ? 'Reset Your Password' : 'Invalid Code'}
            </h1>
            {isValidCode ? (
              <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
								<input 
									type='hidden'
									value={formik.values.code}
								 />
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    required
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
									"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Submitting...' : 'Reset Password'}
                </button>
              </form>
            ) : (
              <p className="text-red-500">Invalid code. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
