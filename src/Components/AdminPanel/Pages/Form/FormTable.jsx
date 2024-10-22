import React, { useEffect, useState } from "react";
import "../../Styles/AdminPages.css";
import { Link } from "react-router-dom";
import { RiAddBoxLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const FormTable = () => {
  const [hideInput, setHideInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Admin || Form";
  }, []);

  const tableData = [];
  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="pageheading">
          <h6>Form Table</h6>
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
            <Link to="/admin/form/add">
              <button>
                <RiAddBoxLine className="headicon" /> Add
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="mid-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Guardian</th>
                <th>Gender</th>
                <th>Dob</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData
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
                  .map((patient, index) => (
                    <tr
                      key={patient.p_id}
                      className={index % 2 === 0 ? "tr-one" : "tr-two"}
                    ></tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FormTable;
