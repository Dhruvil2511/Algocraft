import React, { useState } from 'react';
import './Content.css'
import { updateTheme } from '../Landing/Navigation';

const MobileOffcanvasNavbar = () => {
    const [isDarkTheme, setDarkTheme] = useState(true);
    const [path, setPath] = useState(window.location.pathname);

    function handleTheme() {
        setDarkTheme(!isDarkTheme);
        updateTheme(isDarkTheme);
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg opacity-100 sticky-top p-1 ">
                <div className="container-fluid">
                    <div className="d-flex justify-content-start align-items-center">
                        <div
                            className="gola ms-2"
                            style={{ backgroundColor: "rgba(0, 208, 219, 1)" }}
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
                            <li className="nav-item py-2">
                                <a href="/coding-sheets" className={path === '/coding-sheets' ? 'nav-link mx-2 text-links active' : 'nav-link mx-2 text-links '} aria-current="page">
                                    <i className="fa-solid fa-network-wired fa-lg px-2" ></i>
                                    Coding Sheets
                                </a>
                            </li>
                            <li className="nav-item py-2">
                                <a href="/upcoming-contests" className={path === '/upcoming-contests' ? 'nav-link mx-2 text-links active ' : 'nav-link mx-2 text-links '}>
                                    <i className="fa-solid fa-trophy fa-lg px-2" ></i>
                                    Upcoming contests
                                </a>
                            </li>
                            <li className="nav-item py-2">
                                <a href="/coding-resources" className={path === '/coding-resources' ? 'nav-link mx-2 text-links active ' : 'nav-link mx-2 text-links '}>
                                    <i className="fa-solid fa-vault fa-lg px-2"></i>

                                    Coding Resources
                                </a>
                            </li>
                            <li className="nav-item py-2">
                                <a href="/discussion" className={path === '/discussion' ? 'nav-link mx-2 text-links active ' : 'nav-link mx-2 text-links '}>
                                    <i className="fa-solid fa-comments fa-lg px-2"></i>
                                    Discussion Page
                                </a>
                            </li>
                            <li className="nav-item py-2">
                                <a href="/coding-ide" className={path === '/coding-ide' ? 'nav-link mx-2 text-links active ' : 'nav-link mx-2 text-links  '} >
                                    <i className="fa-solid fa-terminal fa-lg px-2"></i>
                                    Coding IDE
                                </a>
                            </li>
                            <li className="nav-item py-2">
                                <div className="dropdown dropup-center mx-2">
                                    <a href="/" className="d-flex align-items-center dropdown-toggle text-decoration-none" id="dropdownUser1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://avatars.githubusercontent.com/u/91490304?v=4" alt="" width="32" height="32" className="rounded-circle me-2" />
                                        <strong>Dhruvil</strong>
                                    </a>
                                    <ul className="mt-2 dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                        <li><a className="dropdown-item" href="/">Settings</a></li>
                                        <li><a className="dropdown-item" href="/">Profile</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="/">Sign out</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MobileOffcanvasNavbar