import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../Styles/AdminPages.css";

const DonationHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("authToken");
 

  useEffect(() => {
    const fetchDonationHistory = async () => {
      if (!token) {
        setError("Token is missing.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${baseURL}/api/v1/donation-history/list/${id}?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              "x-access-token": `${token}`, // Add token to headers
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        const data = await response.json();
        

        if (response.ok) {
          if (Array.isArray(data.lists)) {
            setHistory(data.lists);
            // Assuming your API returns totalCount in the response
            setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
          } else {
            setError("Unexpected data format.");
          }
        } else {
          setError(data.message || "Failed to fetch donation history.");
        }
      } catch (error) {
        setError("An error occurred while fetching donation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, [id, currentPage, itemsPerPage, token]);

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
        <h6>Donation History</h6>
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
                <th>User</th>
                <th>Donation Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.user.name}
                      <img
                        src={item.user.profile_img}
                        alt={item.user.name}
                        style={{
                          width: "30px",
                          borderRadius: "50%",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                    <td>{item.donationAmount}</td>
                    <td>{item.transactionId}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No donation history available</td>
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

export default DonationHistory;
