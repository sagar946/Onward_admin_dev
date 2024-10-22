import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from '../../Styles/DisplayComments.css'

const DisplayComments = () => {
    const { id } = useParams();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`${baseURL}/api/v1/forum-post/get-forum-comments/${id}`, {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                });
                setComments(response.data.lists || []);
            } catch (error) {
                setError("Failed to load comments.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment) {
            alert("Comment cannot be empty.");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(
                `${baseURL}/api/v1/forum-post/create-comment/${id}`,
                { comment: newComment },
                {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                }
            );
            setComments((prevComments) => [...prevComments, response.data.result]);
            setNewComment("");
            alert("Comment added successfully.");
        } catch (error) {
            alert("Failed to add comment.");
        }
    };

    if (loading) {
        return <p>Loading comments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.customCommentSection}>
            <h1 className={styles.customTitle}>Comments</h1>
            {comments.length === 0 ? (
                <div>
                    <p className={styles.customNoCommentsText}>
                        No comments have been posted for this forum yet. Be the first to share your thoughts!
                    </p>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            className={styles.customTextarea}
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add your comment..."
                            required
                        />
                        <button className={styles.customSubmitButton} type="submit">Submit Comment</button>
                    </form>
                </div>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className={styles.customCommentBox}>
                        <h3>User: {comment.user?.profile_img || comment.user?.userId || 'Anonymous'}</h3>
                        <h3>Comment: {comment.comment}</h3>
                        <h3>Status: {comment.status}</h3>
                        <h3>Created At: {new Date(comment.createdAt).toLocaleString()}</h3>
                    </div>
                ))
            )}
        </div>
    );
};

export default DisplayComments;
