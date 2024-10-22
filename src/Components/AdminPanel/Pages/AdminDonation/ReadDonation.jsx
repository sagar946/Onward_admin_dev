import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/AdminPages.css";

const ReadDonation = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError("");
      try {
        const baseURL = process.env.REACT_APP_BASE_URL;
        const response = await fetch(
          `${baseURL}/api/v1/donation-post?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();
        if (response.ok) {
          if (Array.isArray(data.lists)) {
            setDonations(data.lists);
           
            setTotalPages(Math.ceil(data.totalcount / itemsPerPage));
          } else {
            setError("Unexpected data format.");
          }
        } else {
          setError(data.message || "Failed to fetch donations.");
        }
      } catch (error) {
        setError("An error occurred while fetching donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [currentPage, itemsPerPage]);

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/update/${id}`);
  };

 

  const handleStatusChange = async (e,id, currentStatus) => {
    e.stopPropagation()
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;
      const newStatus = currentStatus === "active" ? "inactive" : "active"; // Toggle status

      // Make API request to update status
      const response = await fetch(
        `${baseURL}/api/v1/donation-post/update-status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update the status locally if API request is successful
        setDonations((prevDonations) =>
          prevDonations.map((donation) =>
            donation._id === id ? { ...donation, status: newStatus } : donation
          )
        );
        alert(data.message); // Notify user about status change
      } else {
        setError(data.message || "Failed to update donation status.");
      }
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

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="pageheading">
        <h6>Donations</h6>
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
                <th>Foundation Name</th>
                <th>Title</th>
                <th>Description</th>
                <th>Target Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr
                    key={donation._id}
                    onClick={() =>
                      navigate(`/admin/donation-history/${donation._id}`)
                    }
                  >
                    <td>{donation.foundationName}</td>
                    <td>{donation.title}</td>
                    <td>{donation.description}</td>
                    <td>{donation.targetAmount}</td>
                    <td>{new Date(donation.startDate).toLocaleDateString()}</td>
                    <td>{new Date(donation.endDate).toLocaleDateString()}</td>
                    <td>{donation.status}</td>
                    <td>
                      <button onClick={(e) => handleEdit(e,donation._id)}>
                        <FaEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) =>
                          handleStatusChange(e,donation._id, donation.status)
                        }
                      >
                        {donation.status === "active"
                          ? "Set Inactive"
                          : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No donations available</td>
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

export default ReadDonation;
