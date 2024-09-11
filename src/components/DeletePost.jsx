import axios from "axios";
import PropTypes from 'prop-types';



export default function DeletePost({ post, onDelete }) {
    const handleDelete = () => {

            axios.delete(`http://localhost:3000/posts/${post.id}`)
                .then(() => {
                    onDelete(post.id);
                    alert("Post deleted successfully");
                })
                .catch(err => {
                    console.error("Error deleting post:", err);
                    alert("Failed to delete post. Please try again.");
                });
    };

    return (
        <button className="btn btn-sm btn-error text-white" onClick={handleDelete}>Delete</button>
    );
}

DeletePost.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};