import React from "react";
import { Link } from "react-router-dom";
import mylogo from "../components/img/logo1-navbar.png";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <a href="/">
                <img src={mylogo} alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    <a href="/">Homepage</a>
                  </li>
                  <li>
                    <a href="/categories">
                      Categories <span className="arrow_carrot-down"></span>
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="/">Categories ungoing</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/blog">Our Blog</a>
                  </li>
                  <li>
                    <a href="/contact">Contacts</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right d-flex">
              <a href="/search" className="search-switch pt-2 ">
                <span className="icon_search"></span>
              </a>
              {isLoggedIn && (
                <div className="header__menu mobile-menu">
                <ul>
                  <li>
                    <a href="/admin" className="d-flex p-2 mt-1">
                    {isLoggedIn && "Admin"} <span className="icon_profile"></span> <span className="arrow_carrot-down"></span>
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="/admin">Dashboard</a>
                      </li>
                      <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                    </ul>
                  </li>
                </ul>
                </div>
              )}
              {!isLoggedIn && (
                <ul className="navbar-nav ms-2">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      Login <span className="icon_profile"></span>
                    </Link>
                  </li>
                </ul>
              )}

              {/* <a href="/login">
                <span className="icon_profile"></span>
              </a> */}
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
}

export default Navbar;
