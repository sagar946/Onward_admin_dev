import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/AdminPages.css";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const UserDetails = () => {
  const [hideInput, setHideInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    document.title = "Admin || User";

    // Fetch data from the API
    const fetchData = async () => {
      const url = `${baseURL}/api/v1/users/list?page=1&limit=10&sortQuery=all`;
      console.log("Fetching data from:", url); // Log the URL being fetched

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ4MWU2YmJmNzQ1ZjE4NmUyYjA0OGMiLCJpYXQiOjE3MjU2MDk1MTAsImV4cCI6MTc1NzE0NTUxMH0.KgQY-8YDnbq8-SaxLG5CviuwfuJVPQ2kOayMNEB-dUM", // Replace with your actual token
        },
      };

      try {
        const response = await axios.request(config);
        console.log("API Response Data:", response.data); // Log the entire response

        if (response.data && response.data.users) {
          // Correctly accessing users array from the response
          setUserData(response.data.users);
        } else {
          console.warn("Unexpected API response format:", response.data);
          setError("Unexpected data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check your network and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Table</h6>
          <div>
            {hideInput && (
              <input
                type="search"
                name="search"
                placeholder="Search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            <button onClick={() => setHideInput(!hideInput)}>
              {!hideInput ? (
                <IoSearchSharp className="headicon" />
              ) : (
                <RxCross2 className="headicon" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="mid-container">
          {loading ? (
            <div className="loader"></div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData
                  .filter((user) =>
                    searchQuery === ""
                      ? true
                      : Object.values(user).some((value) =>
                          value
                            .toString()
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                  )
                  .map((user, index) => (
                    <tr
                      key={user._id}
                      className={index % 2 === 0 ? "tr-one" : "tr-two"}
                    >
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
