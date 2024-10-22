import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiTableLine } from "react-icons/ri";
import {
  IoMdArrowDropdown,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FiToggleLeft } from "react-icons/fi";


const AdminSidebar = ({ toggle }) => {
  const location = useLocation();
  const [hideChildUl, setHideChildUl] = useState(0);

  const toggleDrop = (value) => {
    hideChildUl === value ? setHideChildUl(0) : setHideChildUl(value);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Logout button clicked'); // Debugging
    localStorage.clear();
    console.log('Local storage cleared'); // Debugging
    navigate("/adminlogin");
    console.log('Navigating to login page'); // Debugging
  };




  return (
    <ul style={{ textAlign: toggle ? "start" : "center" }}>
      <li>
        <Link
          to="/admin/dashboard"
          className={
            location.pathname === "/admin/dashboard" ||
              location.pathname.endsWith("/admin")
              ? "linkactive"
              : ""
          }
        >
          <AiOutlineHome
            className={toggle ? "sidebaricon" : "sidebaricon-lg"}
          />
          {toggle && "Dashboard"}
        </Link>
      </li>
      <li>
        <Link
          to="/admin/create"
          className={
            location.pathname === "/admin/create"
              ? "linkactive"
              : ""
          }
        >
          <MdFormatListBulletedAdd className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Create Donation"}
        </Link>
      </li>

      <li>
        <Link
          to="/admin/read"
          className={
            location.pathname === "/admin/read"
              ? "linkactive"
              : ""
          }
        >
          <MdFormatListBulletedAdd className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "View Donation"}
        </Link>
      </li>

      {/* <li>
        <Link
          to="/admin/donation-history/:id"
          className={
            location.pathname === "/admin/donation-history/:id"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Donation History"}
        </Link>
      </li> */}
     
      <li>
        <Link
          to="/admin/create-reason"
          className={
            location.pathname === "/admin/create-reason"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Create Migraine Reason"}
        </Link>
      </li>
      
      <li>
        <Link
          to="/admin/view-reasons"
          className={
            location.pathname === "/admin/view-reasons"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "View Migraine Reasons"}
        </Link>
      </li>
     
      <li>
        <Link
          to="/admin/create-blog"
          className={
            location.pathname === "/admin/create-blog"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Create Blog"}
        </Link>
      </li>
     
      <li>
        <Link
          to="/admin/view-blogs"
          className={
            location.pathname === "/admin/view-blogs"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "View Blogs"}
        </Link>
      </li>

      <li>
        <Link
          to="/admin/create-insight"
          className={
            location.pathname === "/admin/create-insight"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Create Insight"}
        </Link>
      </li>
     
      <li>
        <Link
          to="/admin/view-insights"
          className={
            location.pathname === "/admin/view-insights"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "View Insight"}
        </Link>
      </li>
      
      <li>
        <Link
          to="/admin/create-position"
          className={
            location.pathname === "/admin/create-position"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Create Position"}
        </Link>
      </li>

      <li>
        <Link
          to="/admin/view-positions"
          className={
            location.pathname === "/admin/view-positions"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "View Migraine Positions"}
        </Link>
      </li>


      <li>
        <Link
          to="/admin/user"
          className={
            location.pathname === "/admin/user"
              ? "linkactive"
              : ""
          }
        >
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "User Details"}
        </Link>
      </li>
      <li>
        <Link
          className={hideChildUl === 1 && "linkactive"}
          onClick={() => toggleDrop(1)}
        >
          <FiToggleLeft
            className={toggle ? "sidebaricon" : "sidebaricon-lg"}
          />
          {toggle && "Forum"}
          {toggle &&
            (hideChildUl === 1 ? (
              <IoMdArrowDropleft className="toggleside-ricon" />
            ) : (
              <IoMdArrowDropdown className="toggleside-ricon" />
            ))}
        </Link>
        {/* toggle ul */}
        {hideChildUl === 1 && (
          <ul className="toggleside-ul">
            <li>
              <Link
                to="/admin/create-forum"
                className={
                  location.pathname ===
                    "/admin/create-forum"
                    ? "linkactive"
                    : ""
                }
              >
                {toggle && <IoMdArrowDropright className="toggleside-icon" />}
                Create Forum
              </Link>
            </li>
            <li>
              <Link
                to="/admin/forum-list"
                className={
                  location.pathname ===
                    "/admin/forum-list"
                    ? "linkactive"
                    : ""
                }
              >
                {toggle && <IoMdArrowDropright className="toggleside-icon" />}
                Forum List
              </Link>
            </li>

          </ul>
        )}
      </li>
      <li>
        <Link
          onClick={() => toggleDrop(2)}
          className={hideChildUl === 2 && "linkactive"}
        >
          <FiToggleLeft className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Toggle Two"}
          {toggle &&
            (hideChildUl === 2 ? (
              <IoMdArrowDropleft className="toggleside-ricon" />
            ) : (
              <IoMdArrowDropdown className="toggleside-ricon" />
            ))}
        </Link>
        {/* toggle ul */}
        {hideChildUl === 2 && (
          <ul className="toggleside-ul">
            <li>
              <Link
                to="/admin"
                className={
                  location.pathname ===
                    "/admin"
                    ? "linkactive"
                    : ""
                }
              >
                {toggle && <IoMdArrowDropright className="toggleside-icon" />}
                Dummy
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <button onClick={handleLogout} className="logout-btn">
          <RiTableLine className={toggle ? "sidebaricon" : "sidebaricon-lg"} />
          {toggle && "Logout"}
        </button>
      </li>
    </ul>
  );
};

export default AdminSidebar;
