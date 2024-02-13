import React, { useEffect, useState } from "react";
import "../Content.css";
import { updateTheme } from "../../Landing/Navigation";
import { Link } from "react-router-dom";

const MobileOffcanvasNavbar = ({ user }) => {
  const [isDarkTheme, setDarkTheme] = useState(true);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkTheme(true);
    else if (theme === "light") setDarkTheme(false);
  }, []);

  function handleTheme() {
    if (isDarkTheme) localStorage.setItem("theme", "light");
    else localStorage.setItem("theme", "dark");

    setDarkTheme(!isDarkTheme);
    updateTheme(isDarkTheme);
  }
  return (
    <>
      <nav className="navbar p-1 sticky-top">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="hamburger">
            <button
              style={{ background: "transparent", border: "none" }}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              <i className="fa-solid fa-bars fa-2xl"></i>
            </button>
          </div>
          <div
            className="gola ms-2"
            style={{ backgroundColor: "rgba(0, 208, 219, 1)" }}
          >
            <i className="fa-solid fa-code fa-l"></i>
          </div>
          <div className="dropstart ">
            <Link
              to="/"
              className="d-flex align-items-center dropdown-toggle text-decoration-none"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user?.avatar ? (
                <img
                  src={`${user?.avatar}`}
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
              ) : (
                <>
                  {" "}
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="gola">
                      <i className="default-icon fa-solid fa-user fa-xl"></i>
                    </div>
                  </div>
                </>
              )}
            </Link>
            <ul
              className="pfp-menu dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <Link className="dropdown-item" to={`/edit-profile`}>
                  Edit
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={`${user?.username}`}>
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header d-flex justify-content-start align-items-center flex-column">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          >
            <i className="fa-solid fa-xmark fa-xl"></i>
          </button>
        </div>
        <div className="offcanvas-body d-flex justify-content-start align-items-center flex-column">
          <div className="py-3">
            <Link
              to="/coding-sheets/striver"
              className={
                path.includes("/coding-sheets") ? "nav-link active" : "nav-link"
              }
              aria-current="page"
            >
              <i className="fa-solid fa-network-wired fa-lg px-2"></i>
            </Link>
          </div>
          <div className="py-3">
            <Link
              to="/upcoming-contests"
              className={
                path.includes("/upcoming-contests")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="fa-solid fa-trophy fa-lg px-2"></i>
            </Link>
          </div>
          <div className="py-3">
            <Link
              to="/coding-resources"
              className={
                path.includes("/coding-resources")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="fa-solid fa-vault fa-lg px-2"></i>
            </Link>
          </div>
          <div className="py-3">
            <Link
              to="/discussion?category=all"
              className={
                path.includes("discussion") ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa-solid fa-comments fa-lg px-2"></i>
            </Link>
          </div>
          <div className="py-3">
            <Link
              to="/coding-ide"
              className={
                path === "/coding-ide" ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa-solid fa-terminal fa-lg px-2"></i>
            </Link>
          </div>
        </div>
        <div className="offcanvas-footer d-flex justify-content-center align-items-center p-5">
          <div>
            {isDarkTheme ? (
              <button
                className="rounded-square-button"
                onClick={handleTheme}
                style={{ marginRight: "10px" }}
              >
                <i className="fa-solid fa-sun"></i>
              </button>
            ) : (
              <button
                className="rounded-square-button"
                onClick={handleTheme}
                style={{ marginRight: "10px" }}
              >
                <i
                  className="fa-solid fa-moon"
                  style={{ color: "#000000" }}
                ></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileOffcanvasNavbar;
