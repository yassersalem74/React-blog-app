import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.firstName) {
      validationErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      validationErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password length must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    // check if email already exists
    if (Object.keys(validationErrors).length === 0) {
      axios.get("https://spot-future-player.glitch.me/users")
        .then(res => {
          const userExists = res.data.some(user => user.email === formData.email);
          if (userExists) {
            validationErrors.email = "Email already exists";
            setErrors(validationErrors);
          } else {
            axios.post("https://spot-future-player.glitch.me/users", formData)
              .then(res => {
                console.log(res);
                alert("Registration Successful");
                navigate('/login');
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border p-5 m-9 rounded-lg">
      {/* Image Section */}
      <div className="md:order-1">
        <img
          src="../../public/register2.jpg"
          alt="Sign Up"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="md:order-2">
        <div>
          <h1 className="text-center text-3xl pb-6 text-sky-600 font-bold">Sign up now!</h1>
        </div>

        <div className="flex gap-3">
          {/* First Name */}
          <div className="mb-4 w-1/2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter first name"
            />
            {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className="mb-4 w-1/2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter last name"
            />
            {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter email"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-400 hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
        <p className="text-center">Already have account? <Link to="/login" className="font-bold text-sky-500">Login Now</Link></p>
      </form>
    </div>
  );
}