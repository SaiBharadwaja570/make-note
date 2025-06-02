import React from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail, apiPost } from '../../../utils/helper';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import PasswordInput from '../../components/PasswordInput';

const Signup = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState(null); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validEmail(email.trim())) {
      setError('Invalid email format');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    setError(null);
    const res = await apiPost('/create-account', { fullName: name, email, password });
    if (res.error) {
      setError(res.message || 'Signup failed');
    } else {
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Register Your Account</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-5">
              <input
                type="text"
                id="text"
                placeholder="Enter your name"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg \
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 \
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 \
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg \
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 \
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 \
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg \
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 \
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 \
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              {error && <p className='text-red-500 text-xs pb-1'> {error} </p>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 \
                         focus:outline-none focus:ring-blue-300 font-medium rounded-lg \
                         text-sm px-5 py-2.5 text-center dark:bg-blue-600 \
                         dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Already Registered?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
