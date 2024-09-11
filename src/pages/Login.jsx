import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

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

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.get("https://spot-future-player.glitch.me/users")
        .then(res => {
          const user = res.data.find(user => user.email === formData.email && user.password === formData.password);
          if (user) {
            login(user);
            navigate('/');
          } else {
            alert("Invalid email or password");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border p-5 m-24 rounded-lg">
      {/* Image Section */}
      <div className="md:order-1">
        <img
          src="/blog3.jpg"
          alt="Login"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="md:order-2">
        <div>
          <h1 className="text-center text-3xl pb-6 text-sky-500 font-bold">Log In</h1>
        </div>

        <div className="flex flex-col gap-3">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
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
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Password"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-400 hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <p className="text-center">Already have account? <Link to="/sign-up" className="font-bold text-sky-500">Register Now</Link></p>
      </form>
    </div>
  );
}