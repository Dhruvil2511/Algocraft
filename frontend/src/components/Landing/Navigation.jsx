import React, { useState } from 'react'
import './Landing.css'

const Navigation = () => {
    const [isDarkTheme, setDarkTheme] = useState(true);


    function updateTheme(isDark) {
        const root = document.documentElement;
        if (isDark) {
            root.style.setProperty('--mainTextColor', "var(--primary-light-text-color)");
            root.style.setProperty('--mainBgColor', "var(--primary-light-color)");
            root.style.setProperty('--secondaryColor', "var(--secondary-light-color)");
            root.style.setProperty('--itemColor', "var(--item-light-color)");
        } else {
            root.style.setProperty('--mainTextColor', "var(--primary-dark-text-color)");
            root.style.setProperty('--mainBgColor', "var(--primary-dark-color)");
            root.style.setProperty('--secondaryColor', "var(--secondary-dark-color)");
            root.style.setProperty('--itemColor', "var(--item-dark-color)");
        }
    }
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
                            <li className="nav-item">
                                <a
                                    className="nav-link mx-2 active"
                                    aria-current="page"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="/">
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="/">
                                    Pricing
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link mx-2">
                                    Register
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;