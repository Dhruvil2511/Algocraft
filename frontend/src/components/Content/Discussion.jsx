import React from 'react'

const Discussion = () => {
    return (
        <div className="content-header">
            <h1>Discussion </h1>
            <p>Dive into collaborative learning at Coding Discussions, Algocraft's vibrant online community. Connect with fellow programmers, seek help, and share knowledge. Our discussion section complements your coding journey, offering support and guidance. Elevate your skills together. Happy coding</p>
            <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex flex-wrap justify-content-center align-items-center" >
                    <a className='text-links m-2 fs-3' href="#">All topics</a>
                    <a className='text-links m-2 fs-6' href="#">Interview Experience</a>
                    <a className='text-links m-2 fs-6' href="#">Algorithms</a>
                    <a className='text-links m-2 fs-6' href="#">Development</a>
                    <a className='text-links m-2 fs-6' href="#">Miscellaneous</a>
                </div>
                <div className="searchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search something" />
                    <button className="searchButton" href="#">
                        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Discussion