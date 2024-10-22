import React, { useEffect, useState } from "react";
import "../Styles/AdminLayout.css";
import { Outlet } from "react-router-dom";
import { HiBars3, HiBars3BottomLeft } from "react-icons/hi2";
import AdminSidebar from "./AdminSidebar";
import logo from "./Onward-logo.jpg";

const AdminLayout = () => {
  const [toggle, setToggle] = useState(true);
  const [checkDevice, setCheckDevice] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 840) {
        setToggle(false);
        setCheckDevice(false);
      } else {
        setToggle(true);
        setCheckDevice(true);
      }
    };
    handleResize();
    // Add event listener to resize event
    window.addEventListener("resize", handleResize);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="adminpanel">
      <div
        className="leftpart"
        style={{
          width: toggle
            ? checkDevice
              ? "18%"
              : "30%"
            : checkDevice
            ? "6%"
            : "15%",
        }}
      >
        <div
          className="lefttop"
          style={{
            justifyContent: toggle ? "start" : "center",
            paddingLeft: toggle ? "12px" : "0",
          }}
        >
          <img src={logo} alt="Logo" className="img-fluid" />
        </div>
        <div className="leftbottom">
          <AdminSidebar toggle={toggle} />
        </div>
      </div>
      <div
        className="rightpart"
        style={{
          width: toggle
            ? checkDevice
              ? "82%"
              : "70%"
            : checkDevice
            ? "94%"
            : "85%",
        }}
      >
        <div className="righttop">
          <>
            {toggle ? (
              <HiBars3
                onClick={() => setToggle(!toggle)}
                className="righttopicon"
              />
            ) : (
              <HiBars3BottomLeft
                onClick={() => setToggle(!toggle)}
                className="righttopicon"
              />
            )}
          </>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
              alt="Profile"
              className="img-fluid"
              id="profile-img"
            />

            <p>Hi, Admin</p>
          </div>
        </div>
        <div className="rightbottom">
          <div className="container-fluid">
            <div className="row">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
