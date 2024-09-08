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

    // check if email already exist
    if (Object.keys(validationErrors).length === 0) {
      axios.get("http://localhost:3000/users")
        .then(res => {
          const userExists = res.data.some(user => user.email === formData.email);
          if (userExists) {
            validationErrors.email = "Email already exists";
            setErrors(validationErrors);
          } else {
            axios.post("http://localhost:3000/users", formData)
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

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-5 m-9 rounded-lg">
      <div>
        <h1 className="text-center text-3xl pb-6 text-sky-700 font-bold">Sign up now!</h1>
      </div>

      <div className="flex gap-3">
        {/* first name */}
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

        {/* last name */}
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

      {/* email */}
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

      {/* password */}
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

      {/* confirm password */}
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
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </button>
      <p className="">Already have account? <Link to="/login" className="text-red-600">Login Now</Link></p>
    </form>
  );
}