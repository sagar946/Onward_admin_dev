import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewInsights = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("authToken");

  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = useState(10);

  const handleEdit = (id) => {
    navigate(`/update-insight/${id}`);
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? "true" : "false"; // Toggle status

      // Make API request to update status
      const { data } = await axios.put(
        `${baseURL}/api/v1/admins/softdelete-insight?id=${id}`,
        {
          headers: {
            "x-access-token": `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setInsights((prevInsights) =>
        prevInsights.map((insight) =>
          insight._id === id ? { ...insight, is_deleted: newStatus } : insight
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
    const getInsights = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(
          `${baseURL}/api/v1/admins/get-insight`,
          {
            headers: {
              "x-access-token": `${localStorage.getItem("authToken")}`,
            },
          }
        );

        setInsights(data.data);
        setCurrentPage(data.pagination.currentPage);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        setError("An error occurred while fetching donations.");
      } finally {
        setLoading(false);
      }
    };

    getInsights();
  }, [currentPage]);

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="pageheading">
        <h6>Insights</h6>
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
                <th>Insight tiltle</th>
                <th>Insight description</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {insights.length > 0 ? (
                insights.map((insight) => (
                  <tr key={insight._id}>
                    <td>{insight.title}</td>
                    <td>{insight.description}</td>
                    <td>
                      <img
                        src={insight?.insight_image}
                        alt=""
                        className="w-25"
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(insight._id)}>
                        <FaEdit />
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleStatusChange(insight._id, insight.is_deleted)
                        }
                      >
                        {insight.is_deleted ? "Set Active" : "Set Inactive"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No insights available</td>
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

export default ViewInsights;
