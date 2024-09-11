import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeletePost from './DeletePost';
import { AuthContext } from "../context/AuthContext";
import NoData from "./NoData";

export default function PostCard() {
    const { currentUserId } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://spot-future-player.glitch.me/posts")
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
        <span className="loading loading-infinity loading-lg"></span>
    }

    if (error) {
        return <div className="flex justify-center">
            <NoData />
            <div>Error: {error.message}</div>;
        </div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
            {posts.map(post => (
                <div key={post.id} className="card card-compact bg-base-100 shadow-xl">
                    {/* <figure>

            <img
                 src={post.image || "../../public/null.png"}
              alt="post image" />
                     </figure> */}


                    <div className="card-body">

                        <div className="flex justify-between">
                            <p>Posted by:<span className="font-bold">  {post.userName || 'Unknown User'} </span></p>

                            <div className="avatar ">
                                <div className="w-12 rounded-full p-1   ">
                                    <img src="../../public/user.png" />
                                </div>
                            </div>
                        </div>
                        {/* <h2 className="card-title">{post.title}</h2> */}
                        <p>{post.description}</p>
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