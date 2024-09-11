import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditPostForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(err => {
                console.error("Error fetching post:", err);
                alert("Failed to fetch post. Please try again.");
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/posts/${id}`, formData)
            .then(response => {
                alert("Post updated successfully");
                navigate('/');
            })
            .catch(err => {
                console.error("Error updating post:", err);
                alert("Failed to update post. Please try again.");
            });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border p-5 m-9 rounded-lg relative">

            {/* Go Home */}
            <div className="w-1/6 absolute top-1 left-1">
                <Link to="/">
                    <img src="../../public/back.png" alt="go-back" className=" w-2/3  sm:w-1/3" />
                </Link>
            </div>
            {/* Image Section */}
            <div className="md:order-1">
                <img
                    src="../../public/add4.jpg"
                    alt="Edit Post"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="md:order-2">
                <div>
                    <h1 className="text-center text-3xl pb-6 text-sky-700 font-bold">Edit Your Post!</h1>
                </div>

                <div className="flex flex-col gap-3">
                    {/* Title */}
                    <div className="mb-4 w-full">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                            type="text"
                            id="title"
                            value={formData.title}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Post Title"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4 w-full">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                            id="description"
                            value={formData.description}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter description"
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-4 w-full">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Url</label>
                        <input
                            onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                            type="text"
                            id="image"
                            value={formData.image}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Image Url"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
}