import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder || 'Your password'}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </div>
    </div>
  );
};

export default PasswordInput;
