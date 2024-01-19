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
            <nav className='navbar p-1 sticky-top' >
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <div className="hamburger">
                        <button style={{ background: "transparent", border: 'none' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                            <i class="fa-solid fa-bars fa-2xl"></i>
                        </button>
                    </div>
                    <div
                        className="gola ms-2"
                        style={{ backgroundColor: "rgba(0, 208, 219, 1)" }}
                    >
                        <i className="fa-solid fa-code fa-l"></i>
                    </div>
                    <div className="dropstart ">
                        <a href="/" className="d-flex align-items-center dropdown-toggle text-decoration-none" id="dropdownUser1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://avatars.githubusercontent.com/u/91490304?v=4" alt="" width="32" height="32" className="rounded-circle me-2" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a className="dropdown-item" href="/">Settings</a></li>
                            <li><a className="dropdown-item" href="/">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="/">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header" >
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" >
                        <i class="fa-solid fa-xmark fa-xl"></i>
                    </button>
                </div>
                <div class="offcanvas-body">
                    <div className="py-3">
                        <a href="/coding-sheets" className={path === '/coding-sheets' ? 'nav-link active' : 'nav-link'} aria-current="page">
                            <i className="fa-solid fa-network-wired fa-lg px-2" ></i>
                        </a>
                    </div>
                    <div className="py-3">
                        <a href="/upcoming-contests" className={path === '/upcoming-contests' ? 'nav-link active' : 'nav-link'}>
                            <i className="fa-solid fa-trophy fa-lg px-2" ></i>

                        </a>
                    </div>
                    <div className="py-3">
                        <a href="/coding-resources" className={path === '/coding-resources' ? 'nav-link active' : 'nav-link'}>
                            <i className="fa-solid fa-vault fa-lg px-2"></i>
                        </a>
                    </div>
                    <div className="py-3">
                        <a href="/discussion" className={path === '/discussion' ? 'nav-link active' : 'nav-link'}>
                            <i className="fa-solid fa-comments fa-lg px-2"></i>
                        </a>
                    </div>
                    <div className="py-3">
                        <a href="/coding-ide" className={path === '/coding-ide' ? 'nav-link active' : 'nav-link'} >
                            <i className="fa-solid fa-terminal fa-lg px-2"></i>

                        </a>
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
    )
}

export default MobileOffcanvasNavbar