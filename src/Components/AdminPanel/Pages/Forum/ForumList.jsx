// ForumList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForumList = () => {
    const [forums, setForums] = useState([]); // Initialize forums state
    const [loading, setLoading] = useState(true); // Loading state
    const baseURL = process.env.REACT_APP_BASE_URL; 

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Fetch token from localStorage
                const response = await axios.get(`${baseURL}/api/v1/forum-post/list?page=1&limit=100`, {
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/json',
                    },
                });
                
                console.log('Forums data:', response.data.data); // Log to verify the data
                setForums(response.data.data); // Set the forums in state
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error('Error fetching forums:', error);
                setLoading(false);
            }
        };

        fetchForums();
    }, []);

    if (loading) {
        return <p>Loading forums...</p>; // Show loading state
    }

    return (
        <div>
            <h1>Forum List</h1>
            <ul>
                {forums.map(forum => (
                    <li key={forum._id}>
                        <img
                            src={forum.user?.profile_img || 'default-image.jpg'} // Display profile image
                            alt="Profile"
                            width="50"
                            height="50"
                            style={{ marginRight: '10px' }}
                        />
                        <Link to={`/admin/forum-list/${forum._id}`}> {/* Link to SingleForumList with forum ID */}
                            <h3>Title: {forum.title}</h3>
                        </Link>
                        <h3>Description: {forum.description}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ForumList;
