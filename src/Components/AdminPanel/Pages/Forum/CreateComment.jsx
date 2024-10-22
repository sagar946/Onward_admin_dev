import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from '../../Styles/CreateComment.css'; // Use custom class names

const CreateComment = () => {
    const { id } = useParams();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [newComment, setNewComment] = useState("");

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
            alert("Comment added successfully.");
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment.");
        }
    };

    return (
        <div className={styles.customCommentContainer}>
            <h1>Add a Comment</h1>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    className={styles.customTextarea}
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Write your comment..."
                    required
                />
                <button className={styles.customSubmitButton} type="submit">
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default CreateComment;
