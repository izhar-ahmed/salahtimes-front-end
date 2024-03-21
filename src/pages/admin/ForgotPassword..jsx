import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { consts } from '@/util/APIEndpoints';

const ForgotPassword = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const initialValues = {
    email: '',
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const navigateToLogin = (e) => {
    e.preventDefault()
    navigate('/m-admin/login')
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
    try {
      const response = await axios.post(consts.FORGOT_PASSWORD_API_PUBLIC, values);
      console.log(response.data.message); // Log success message or handle as needed
      setStatus({ success: true }); // Set success status
      setSubmitting(false);
      setIsVisible(true);
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        const { status, data } = error.response;
        if (status === 404) {
          setErrors({ email: data.message });
        } else {
          setErrors({ email: 'Something went wrong. Please try again later.' });
        }
      } else {
        // Request was made but no response received or network error
        setErrors({ email: 'Network error. Please try again later.' });
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
              Forgot Your Password?
            </h1>
            {formik.status && formik.status.success && isVisible && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Password reset instructions sent successfully.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleClose}>
                  <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 0 0-.707.708L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.64a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.648a.5.5 0 0 0 0-.707z" />
                  </svg>
                </span>
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="name@company.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-4
								"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Reset Password'}
              </button>
              <button
                className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={navigateToLogin}
                type='button'
              >
                Back to Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
