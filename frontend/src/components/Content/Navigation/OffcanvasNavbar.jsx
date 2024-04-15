import React, { useEffect, useState } from "react";
import "../Content.css";
import { updateTheme } from "../../Landing/Navigation";
import { Link, useLocation } from "react-router-dom";

const OffcanvasNavbar = ({ username, avatar }) => {
  const [isDarkTheme, setDarkTheme] = useState(true);
  const location = useLocation();

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
      <div className="d-flex flex-column flex-shrink-0 p-3  sidebar sticky-top">
        <div className="d-flex justify-content-between align-items center">
          <a
            href="#"
            className="d-flex align-items-center mb-3 mb-md-0   text-decoration-none"
          >
            <div
              className="gola ms-2"
              style={{
                background:
                  "var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%)",
              }}
            >
              <i className="fa-solid fa-code fa-lg"></i>
            </div>
          </a>

          <span className="fs-4 px-2">Algocraft</span>
          <div className="d-flex align-items-center justify-content-center">
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
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item py-2">
            <Link
              to="/coding-sheets/striver"
              className={
                location.pathname.includes("/coding-sheets/")
                  ? "nav-link active"
                  : "nav-link"
              }
              aria-current="page"
            >
              <i className="fa-solid fa-network-wired fa-lg px-2"></i>
              Coding Sheets
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link
              to="/upcoming-contests"
              className={
                location.pathname.includes("/upcoming-contests")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="fa-solid fa-trophy fa-lg px-2"></i>
              Upcoming contests
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link
              to="/coding-resources"
              className={
                location.pathname.includes("/coding-resources")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="fa-solid fa-vault fa-lg px-2"></i>
              Coding Resources
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link
              to="/discussion?category=all"
              className={
                location.pathname.includes("discussion")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="fa-solid fa-comments fa-lg px-2"></i>
              Discussion Page
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link
              to="/coding-ide"
              className={
                location.pathname === "/coding-ide"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="fa-solid fa-terminal fa-lg px-2"></i>
              Coding IDE
            </Link>
          </li>
        </ul>
        <div className="dropup-center dropup px-2">
          <button
            className="hamburger"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-bars fa-lg px-2"></i> More
          </button>
          <ul className="dropdown-menu mx-3">
            <li>
              <a className="dropdown-item" href="/">
                Home
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="https://github.com/Dhruvil2511/Algocraft"
              >
                Github
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                About project
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/dmca_policy">
                DMCA Policy
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="dropup dropup-center">
          <a
            href="/"
            className="d-flex align-items-center dropdown-toggle text-decoration-none"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {avatar ? (
              <img
                src={`${avatar}`}
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
            <strong>
              {username && username.length > 15 ? username.slice(0, 15) + "..." : username}
            </strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link className="dropdown-item" to={`/edit-profile`}>
                Edit
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={`/${username}`}>
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
    </>
  );
};

export default React.memo(OffcanvasNavbar);
