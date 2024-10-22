import axios from "axios";
import React, { useState, useEffect } from "react";

const ViewPositions = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active"; // Toggle status

      // Make API request to update status
      const { data } = await axios.put(
        `${baseURL}/api/v1/migraine-position/update-position-status/${id}`,
        { status: newStatus },
        {
          headers: {
            "x-access-token": `${localStorage.getItem("authToken")}`,
          },
        }
      );

      setPositions((prevPositions) =>
        prevPositions.map((position) =>
          position._id === id ? { ...position, status: newStatus } : position
        )
      );

      alert(data.message); // Notify user about status change
    } catch (error) {
      setError("An error occurred while updating the status.");
    }
  };

  useEffect(() => {
    const getPositions = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(
          `${baseURL}/api/v1/migraine-position/get-all-positions`
        );

        setPositions(data.lists);
      } catch (error) {
        setError("An error occurred while fetching donations.");
      } finally {
        setLoading(false);
      }
    };

    getPositions();
  }, []);

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <div className="pageheading">
        <h6>Migraine Positions</h6>
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
                <th>Migraine Positions</th>
                {/* <th>Image</th> */}
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {positions.length > 0 ? (
                positions.map((position) => (
                  <tr key={position._id}>
                    <td>{position.positionName}</td>
                    {/* <td>
                      <img src={position?.image} alt="" className="w-25"/>
                    </td> */}

                    <td>
                      <button
                        onClick={() =>
                          handleStatusChange(position._id, position.status)
                        }
                      >
                        {position.status === "active"
                          ? "Set Inactive"
                          : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No migraine position available</td>
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

export default ViewPositions;
