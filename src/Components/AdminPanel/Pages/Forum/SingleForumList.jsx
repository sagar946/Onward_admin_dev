import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../Styles/SingleForumList.css'; 

const SingleForumList = () => {
    const { id } = useParams(); // Get the forum ID from URL parameters
    const navigate = useNavigate(); // For navigation
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [forumDetails, setForumDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling

    // Fetch forum details
    useEffect(() => {
        const fetchForumDetails = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`${baseURL}/api/v1/forum-post/details/${id}`, {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                });

                setForumDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching forum details:", error);
                setError("Failed to load forum details."); // Set error message
            } finally {
                setLoading(false); // Set loading to false in both success and failure cases
            }
        };

        fetchForumDetails(); // Call the fetchForumDetails function
    }, [id]);

    // Function to handle edit forum navigation
    const handleEdit = () => {
        navigate(`/admin/forum-update/${id}`); // Navigate to the update form
    };

    // Function to handle forum post deletion
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this forum post?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem("authToken");
                await axios.delete(`${baseURL}/api/v1/forum-post/delete/${id}`, {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                });

                alert("Forum post deleted successfully.");
                navigate("/admin/forum-list"); // Navigate back to forum list after deletion
            } catch (error) {
                console.error("Error deleting forum post:", error);
                alert("Failed to delete forum post.");
            }
        }
    };

    // Function to navigate to the comments page
    const handleViewComments = () => {
        navigate(`/admin/forum-comments/${id}`); // Navigate to the separate comment page
    };

    // Function to navigate to the page for creating a new comment
    const handleCreateComment = () => {
        navigate(`/admin/create-comment/${id}`); // Navigate to the comment creation page
    };

    // Function to navigate to the moderation page for accepting/rejecting comments
    const handleModerateComments = () => {
        navigate(`/admin/moderate-comments/${id}`); // Navigate to the moderation page
    };

    if (loading) {
        return <p>Loading forum details...</p>;
    }

    if (error) {
        return <p>{error}</p>; // Display error message if any
    }

    return (
        <div className="container">
            <h1>Title: {forumDetails.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    className="profile-img"
                    src={forumDetails.user?.profile_img || 'default-image.jpg'} // Display profile image
                    alt="Profile"
                    width="50"
                    height="50"
                />
                <h3>Description: {forumDetails.description}</h3>
            </div>
            <h3>Status: {forumDetails.status}</h3>
            <h3>Created At: {new Date(forumDetails.createdAt).toLocaleDateString()}</h3>
            
            {/* Edit and Delete buttons */}
            <div className="buttons">
                <button onClick={handleEdit}>Edit Forum</button>
                <button onClick={handleDelete}>Delete Forum</button>
            </div>
            
            {/* Comment actions */}
            <div className="buttons">
                <button onClick={handleViewComments}>View All Comments</button>
                <button onClick={handleCreateComment}>Add New Comment</button>
                <button onClick={handleModerateComments}>Moderate Comments</button>
            </div>
        </div>
    );
};

export default SingleForumList;
