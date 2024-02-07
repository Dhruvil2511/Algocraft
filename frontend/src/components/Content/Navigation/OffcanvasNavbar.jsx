import React, { useEffect, useState } from "react";
import "../Content.css";
import { updateTheme } from "../../Landing/Navigation";

const OffcanvasNavbar = () => {
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
      <div className="d-flex flex-column flex-shrink-0 p-3  sidebar sticky-top">
        <div className="d-flex justify-content-between align-items center">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0   text-decoration-none"
          >
            <div
              className="gola ms-2"
              style={{ backgroundColor: "rgba(0, 208, 219, 1)" }}
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
            <a
              href="/coding-sheets/striver"
              className={
                path === "/coding-sheets/striver" ? "nav-link active" : "nav-link"
              }
              aria-current="page"
            >
              <i className="fa-solid fa-network-wired fa-lg px-2"></i>
              Coding Sheets
            </a>
          </li>
          <li className="nav-item py-2">
            <a
              href="/upcoming-contests"
              className={
                path === "/upcoming-contests" ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa-solid fa-trophy fa-lg px-2"></i>
              Upcoming contests
            </a>
          </li>
          <li className="nav-item py-2">
            <a
              href="/coding-resources"
              className={
                path === "/coding-resources" ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa-solid fa-vault fa-lg px-2"></i>
              Coding Resources
            </a>
          </li>
          <li className="nav-item py-2">
            <a
              href="/discussion?category=all"
              className={
               path.includes("discussion") ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa-solid fa-comments fa-lg px-2"></i>
              Discussion Page
            </a>
          </li>
          <li className="nav-item py-2">
            <a
              href="/coding-ide"
              className={
                path === "/coding-ide" ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa-solid fa-terminal fa-lg px-2"></i>
              Coding IDE
            </a>
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
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Action two
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Action three
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
            <img
              src="https://avatars.githubusercontent.com/u/91490304?v=4"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Dhruvil</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="/">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/kalash_shah_99">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OffcanvasNavbar;
