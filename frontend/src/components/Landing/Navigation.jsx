import React, { useState } from "react";
import "./Landing.css";
import { updateTheme } from "../../utils/updateTheme";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  const [isDarkTheme, setDarkTheme] = useState(true);

  function handleTheme() {
    if (isDarkTheme) localStorage.setItem("theme", "light");
    else localStorage.setItem("theme", "dark");

    setDarkTheme(!isDarkTheme);
    updateTheme(isDarkTheme);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg opacity-100 sticky-top p-1 ">
        <div className="container-fluid">
          <div className="d-flex justify-content-start align-items-center">
            <div
              className="gola ms-2 "
              style={{
                background:
                  "var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%)",
              }}
            >
              <i className="fa-solid fa-code fa-l"></i>
            </div>
            <form action="/">
              <input
                type="button"
                className="name fs-4 px-3"
                value="Algocraft"
                style={{ background: "transparent", border: "none" }}
              />
            </form>
          </div>

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

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse w-20" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link
                  className="nav-link mx-2 active text-links"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-links" href="#features">
                  Features
                </a>
              </li> 
              <li className="nav-item">
                <Link className="nav-link mx-2 text-links" to="#">
                  About project
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <Link to={`/${user.username}`}>
                    {user?.avatar ? (
                      <img
                        src={`${user?.avatar}`}
                        alt=""
                        width="32"
                        height="32"
                        className="rounded-circle me-2 mt-1"
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
                ) : (
                  <Link to="/login" className="nav-link mx-2 text-links">
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navigation, updateTheme };
