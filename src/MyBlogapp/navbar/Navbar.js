import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/blogging_1289299.png"; // Blog logo

export const Navbar = () => {
  const navigate = useNavigate();
  const res = localStorage.getItem("user");
  const user = JSON.parse(res);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="blog-navbar">
        <div className="nav-left">
          <img className="logoName" src={logo} alt="Blog Logo" />
        </div>

        {/* Desktop view - all content */}
        <div className="nav-right">
          <h3 className="nav-right-content">My Post</h3>
          <h3 className="nav-right-content">
            <Link to="/blogList/">All Blog</Link>
          </h3>
          {user?.userName && (
            <h3 className="navbar-username">{user?.userName}</h3>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile view - image and logout button only */}
      <div className="mobile-menu">
        <div className="mobile-left">
          <img className="logoName" src={logo} alt="Blog Logo" />
        </div>
        <div className="mobile-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
