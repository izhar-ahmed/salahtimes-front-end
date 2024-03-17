import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordLink from './ForgotPasswordLink';
import ReCAPTCHA from 'react-google-recaptcha';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [successMessage, setSuccessMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const recaptchaRef = useRef(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [cancelToken, setCancelToken] = useState(null);

  const handleClose = () => {
    setIsVisible(false);
    window.history.replaceState({}, '', window.location.pathname);
  };

  const onRecaptchaChange = (token) => {
    console.log(token)
    setRecaptchaToken(token);
  };

  const setCaptchaRef = (ref) => {
    if (ref) {
      return recaptchaRef.current = ref;
    }
  };

  const signIn = async (credential) => {
    try {
      let headers = { headers: { 'Content-Type': 'application/json' } };
      let response = await axios.post('http://localhost:8080/api/login', { ...credential, recaptchaToken, _csrf: csrfToken }, headers);
      return {
        "token": response.data.token,
        "name": response.data.name,
        "isAdmin": response.data.roles[0].Roles.includes("Admin")
      }
    } catch (error) {
      console.error("error while login", error);
      navigate('/m-admin/login');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const authToken = await signIn(values);
        if (!authToken) {
          navigate('/m-admin/login');
        } else {
          localStorage.setItem('token', authToken.token);
          localStorage.setItem('isAdmin', authToken.isAdmin)
          localStorage.setItem('name', authToken.name)
          navigate('/m-admin');
        }
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
  });

  function generateUniqueString(length = 10) {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substr(2, length);
    return timestamp + randomString;
  }

  // Fetch CSRF token from the server when the component mounts
  const fetchCsrfToken = async (token) => {
    try {
      const uniqueString = generateUniqueString();
      const response = await axios.get(`http://localhost:8080/api/csrf-token/${uniqueString}`, {
        cancelToken: token
      });
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  useEffect(() => {
    if (cancelToken) {
      cancelToken.cancel('Operation canceled by the user.');
    }
    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    fetchCsrfToken(newCancelToken.token);

    if (state && state.successMessage) {
      setSuccessMessage(state.successMessage);
    }

    return () => {
      if (newCancelToken) {
        newCancelToken.cancel('Component unmounted.');
      }
    };
  }, [state]);

  return (
    <section className="bg-gray-50 light:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow light:border md:mt-0 sm:max-w-md xl:p-0 light:bg-gray-800 light:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white">
              Log in to your account
            </h1>
            <div>
              {successMessage && isVisible && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> {successMessage}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleClose}>
                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <title>Close</title>
                      <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 0 0-.707.708L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.64a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.648a.5.5 0 0 0 0-.707z" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
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
                  onChange={(event) =>
                    formik.handleChange(event, {
                      target: {
                        ...event.target,
                        value: DOMPurify.sanitize(event.target.value),
                      },
                    })
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                    }`}
                  onChange={(event) =>
                    formik.handleChange(event, {
                      target: {
                        ...event.target,
                        value: DOMPurify.sanitize(event.target.value),
                      },
                    })
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <input
                  type="hidden"
                  name="_csrf"
                  value={csrfToken}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>
              <ForgotPasswordLink />
              <ReCAPTCHA
                sitekey="6Le8g3IpAAAAAFixDZCvnUbZRWFS07FWlOVEIWI5"
                onChange={onRecaptchaChange}
                ref={setCaptchaRef}
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                "
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
