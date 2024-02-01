import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      let headers = { headers: { 'Content-Type': 'application/json' } };
      let response = await axios.post('http://localhost:8080/api/login', values, headers);
      const authToken = response.data.token;

      if (!authToken) {
        console.log("Token is invalid");
        navigate('/m-admin');
      }

      localStorage.setItem('token', authToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure (show an error message, etc.)
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, form, values }) => (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 md:space-y-6 p-8 bg-white rounded-lg shadow-md light:bg-gray-800">
            <h1 className="text-2xl font-semibold">Login</h1>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Your email</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              />
              <div className="text-red-500">
                <Field name="email" subscription={{ touched: true, error: true }}>
                  {({ meta }) => (meta.touched && meta.error ? meta.error : null)}
                </Field>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Password</label>
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              />
              <div className="text-red-500">
                <Field name="password" subscription={{ touched: true, error: true }}>
                  {({ meta }) => (meta.touched && meta.error ? meta.error : null)}
                </Field>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
            >
              Log in
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default LoginForm;
