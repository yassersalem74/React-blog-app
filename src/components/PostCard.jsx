import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeletePost from './DeletePost';
import { AuthContext } from "../context/AuthContext";

export default function PostCard() {
    const { currentUserId } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    if (loading) {
        return <div className="hourglass"></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {posts.map(post => (
                <div key={post.id} className="card card-compact bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src={post.image}
                            alt="post image" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{post.title}</h2>
                        <p>{post.description}</p>
                        <p>Posted by:<span className="font-bold">  {post.userName || 'Unknown User'} </span></p>
                        <div className="card-actions justify-end">
                            {currentUserId === post.userId && (
                                <Link to={`/edit/${post.id}`} className="btn btn-sm btn-primary">Edit</Link>
                            )}
                            {currentUserId === post.userId && (
                                <DeletePost post={post} onDelete={handleDelete} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}