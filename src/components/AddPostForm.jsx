import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";

export default function AddPostForm() {
  const { currentUserId, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.title) {
      validationErrors.title = "Title is required";
    }

    if (!formData.description) {
      validationErrors.description = "Description is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:3000/posts", {
        ...formData, // Spread the formData object directly
        userId: currentUserId ? currentUserId : null, // Use the actual user ID
        userName: currentUser ? currentUser.firstName : null // Use the actual user's first name
      })
        .then(res => {
          console.log(res);
          alert("Post added successfully");
          console.log(currentUser.firstName);
          navigate('/');
        })
        .catch(err => {
          console.error("Error adding post:", err);
          alert("Failed to add post. Please try again.");
        });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border p-5 m-9 rounded-lg relative">

      {/* Go Home */}
      <div className="w-1/6 absolute top-1 left-1">
        <Link to="/">
          <img src="../../public/back.png" alt="go-back" className="w-2/3 sm:w-1/3" />
        </Link>
      </div>

      {/* Image Section */}
      <div className="md:order-1">
        <img
          src="../../public/add3.avif"
          alt="Add Post"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="md:order-2">
        <div>
          <h1 className="text-center text-3xl pb-6 text-sky-700 font-bold">Add Post!</h1>
        </div>

        <div className="flex flex-col gap-3">
          {/* Title */}
          <div className="mb-4 w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Post Title"
            />
            {errors.title && <span className="text-red-500">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="mb-4 w-full">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              id="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter description"
            />
            {errors.description && <span className="text-red-500">{errors.description}</span>}
          </div>

          {/* Image */}
          <div className="mb-4 w-full">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Url</label>
            <input
              onChange={(event) => setFormData({ ...formData, image: event.target.value })}
              type="text"
              id="image"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Image Url"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}