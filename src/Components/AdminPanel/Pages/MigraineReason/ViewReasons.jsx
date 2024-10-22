import axios from "axios";
import React, { useState, useEffect } from "react";

const ViewReasons = () => {
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active"; // Toggle status

      // Make API request to update status
      const { data } = await axios.patch(
        `${baseURL}/api/v1/migraine-reason/change-status/${id}`,
        { status: newStatus },
        {
          headers: {
            "x-access-token": `${localStorage.getItem("authToken")}`,
          },
        }
      );

      setReasons((prevReasons) =>
        prevReasons.map((reason) =>
          reason._id === id ? { ...reason, status: newStatus } : reason
        )
      );

      alert(data.message); // Notify user about status change
    } catch (error) {
      setError("An error occurred while updating the status.");
    }
  };

  useEffect(() => {
    const getReasons = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(
          `${baseURL}/api/v1/migraine-reason/get-all-reasons`
        );

        setReasons(data.lists);
      } catch (error) {
        setError("An error occurred while fetching donations.");
      } finally {
        setLoading(false);
      }
    };

    getReasons();
  }, []);

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="pageheading">
        <h6>Reasons</h6>
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
                <th>Migraine Reason</th>
                <th>Image</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {reasons.length > 0 ? (
                reasons.map((reason) => (
                  <tr key={reason._id}>
                    <td>{reason.title}</td>
                    <td>
                      <img src={reason?.image} alt="" className="w-25"/>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleStatusChange(reason._id, reason.status)
                        }
                      >
                        {reason.status === "active"
                          ? "Set Inactive"
                          : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No reasons available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {/* <div className="pagination">
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
          </div> */}
        </>
      )}
    </div>
  );
};

export default ViewReasons;
