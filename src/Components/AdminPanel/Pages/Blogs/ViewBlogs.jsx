import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewBlogs = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("authToken");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = useState(10);
 
 
  const handleEdit = (id) => {
    navigate(`/update-blog/${id}`);
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? "true" : "false"; // Toggle status

      // Make API request to update status
      const { data } = await axios.put(
        `${baseURL}/api/v1/admins/softdelete-blog?id=${id}`,
        {
          headers: {
            "x-access-token": `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, is_deleted: newStatus } : blog
        )
      );

      alert(data.message); // Notify user about status change
    } catch (error) {
      setError("An error occurred while updating the status.");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };



  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${baseURL}/api/v1/admins/get-blog`, {
          headers: {
            "x-access-token": `${token}`,
          },
        });

        setBlogs(data.data);
        setCurrentPage(data.pagination.currentPage)
        setTotalPages(data.pagination.totalPages)
      } catch (error) {
        setError("An error occurred while fetching donations.");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [currentPage]);

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="pageheading">
        <h6>Blogs</h6>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Blog tiltle</th>
                <th>Blog description</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{blog.description}</td>
                    <td>
                      <img src={blog?.blog_image} alt="" className="w-25" />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(blog._id)}>
                        <FaEdit />
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleStatusChange(blog._id, blog.is_deleted)
                        }
                      >
                        {blog.is_deleted ? "Set Active" : "Set Inactive"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No blogs available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBlogs;
