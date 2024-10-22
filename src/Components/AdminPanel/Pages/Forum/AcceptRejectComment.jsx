import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AcceptRejectComment = () => {
    const { id } = useParams(); // Get forum ID
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    // Fetch comments for moderation
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
                console.log("Fetched comments:", response.data); // Debug: Check fetched comments
                setComments(response.data.lists || []); // Store comments
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("Failed to load comments.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [id]);

    // Accept or reject a comment
    const handleAcceptReject = async (commentId, action) => {
        const url = `${baseURL}/api/v1/forum-post/accept-reject/${commentId}`;
        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.put(
                url,
                { status: action }, // Pass the action ('accept' or 'reject')
                {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update the comment's status in the state after action
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId ? { ...comment, status: response.data.result.status } : comment
                )
            );
            alert(`Comment has been ${action === "accept" ? "accepted" : "rejected"}.`);
        } catch (error) {
            console.error(`Error ${action === "accept" ? "accepting" : "rejecting"} comment:`, error);
            alert(`Failed to ${action === "accept" ? "accept" : "reject"} comment.`);
        }
    };

    if (loading) {
        return <p>Loading comments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Moderate Comments</h1>
            {comments.length === 0 ? (
                <p>No comments available for moderation.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} style={{ borderBottom: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        <h3>User: {comment.user?.profile_img || comment.user?.userId || 'Anonymous'}</h3>
                        <h3>Comment: {comment.comment}</h3>
                        <h3>Status: {comment.status}</h3>
                        <h3>Created At: {new Date(comment.createdAt).toLocaleString()}</h3>
                        {comment.status === "pending" && (
                            <>
                                <button onClick={() => handleAcceptReject(comment._id, "accept")}>Accept</button>
                                <button onClick={() => handleAcceptReject(comment._id, "reject")}>Reject</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AcceptRejectComment;
