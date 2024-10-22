import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../../Styles/UpdateFormPost.css'; 

const UpdateFormPost = () => {
    const { id } = useParams(); // Get the forum ID from URL parameters
    const navigate = useNavigate(); // For navigation after updating
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
    });
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch existing forum data to pre-fill the form
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

                setFormData({
                    title: response.data.data.title,
                    description: response.data.data.description,
                    status: response.data.data.status,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching forum details:", error);
                setLoading(false);
            }
        };

        fetchForumDetails();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.put(`${baseURL}/api/v1/forum-post/update-details/${id}`, formData, {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json",
                },
            });

            navigate(`/admin/forum-list/${id}`);
        } catch (error) {
            console.error("Error updating forum:", error);
        }
    };

    if (loading) {
        return <p>Loading forum details...</p>;
    }

    return (
        <div className="update-form-post-container">
            <h1 className="update-form-post-heading">Update Forum Post</h1>
            <form className="update-form-post-form" onSubmit={handleSubmit}>
                <div className="update-form-post-field">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="update-form-post-input"
                    />
                </div>
                <div className="update-form-post-field">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="update-form-post-textarea"
                    />
                </div>
                <div className="update-form-post-field">
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="update-form-post-select"
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="update-form-post-button">Update Forum Post</button>
            </form>
        </div>
    );
};

export default UpdateFormPost;
