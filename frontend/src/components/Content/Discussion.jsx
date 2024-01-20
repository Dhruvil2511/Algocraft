import React from 'react'

const Discussion = () => {
    return (
        <div className="content-header">
            <h1>Discussion </h1>
            <p>Dive into collaborative learning at Coding Discussions, Algocraft's vibrant online community. Connect with fellow programmers, seek help, and share knowledge. Our discussion section complements your coding journey, offering support and guidance. Elevate your skills together. Happy coding</p>
            <div className="daddy discussion-fliter d-flex align-items-center justify-content-between ">
                <div className="d-flex flex-wrap justify-content-center align-items-center" >
                    <a className='text-links m-2 fs-3 active' href="#">All topics</a>
                    <a className='text-links m-2 fs-6' href="#">Interview Experience</a>
                    <a className='text-links m-2 fs-6' href="#">Algorithms</a>
                    <a className='text-links m-2 fs-6' href="#">Development</a>
                    <a className='text-links m-2 fs-6' href="#">Miscellaneous</a>
                </div>
                <div className="searchBox me-3">
                    <input className="searchInput" type="text" name="" placeholder="Search.." />
                    <button className="searchButton" href="#">
                        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                    </button>
                </div>

            </div>
            <div className="daddy my-4 w-100 d-flex  align-items-center">
                <div className="my-2 table-list w-100" style={{ border: 'none' }}>
                    <div className="row p-2 ">
                        <div className="question  d-flex align-items-center justify-content-between ">
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className="number pfp">
                                    <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                                </div>

                                {/* <div className="status"></div> */}
                                <div className="title d-flex flex-column justify-content-center align-items-start">
                                    <a href='/discussion/interview/123' className="thread-title text-start">My interview experience at Google</a>
                                    <div className="dis-taglist d-flex jutify-content-center align-items-center">
                                        <a href="#" className='username'>kadash_shah</a>
                                        <span className='tags px-2'>interview</span>
                                        <span className='tags px-2'>google</span>
                                        <span className='tags px-2'>dsa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mark-complete px-2"><i className="fa-regular fa-circle-up fa-lg"></i><small className='px-2'>12</small></div>
                                <div className="mark-later px-2"><i className="fa-regular fa-eye fa-lg"></i><small className='px-2'>12k</small></div>

                            </div>
                        </div>
                    </div>
                    <div className="row p-2 ">
                        <div className="question  d-flex align-items-center justify-content-between ">
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className="number pfp">
                                    <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                                </div>

                                {/* <div className="status"></div> */}
                                <div className="title d-flex flex-column justify-content-center align-items-start">
                                    <a href='#' className="thread-title text-start">My interview experience at Google</a>
                                    <div className="dis-taglist  d-flex jutify-content-center align-items-center">
                                        <a href="#" className='username'>kadash_shah</a>
                                        <span className='tags px-2'>interview</span>
                                        <span className='tags px-2'>google</span>
                                        <span className='tags px-2'>dsa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mark-complete px-2"><i className="fa-regular fa-circle-up fa-lg"></i><small className='px-2'>12</small></div>
                                <div className="mark-later px-2"><i className="fa-regular fa-eye fa-lg"></i><small className='px-2'>12k</small></div>

                            </div>
                        </div>
                    </div>
                    <div className="row p-2 ">
                        <div className="question  d-flex align-items-center justify-content-between ">
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className="number pfp">
                                    <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                                </div>

                                {/* <div className="status"></div> */}
                                <div className="title d-flex flex-column justify-content-center align-items-start">
                                    <a href='#' className="thread-title text-start">My interview experience at Google</a>
                                    <div className="dis-taglist  d-flex jutify-content-center align-items-center">
                                        <a href="#" className='username'>kadash_shah</a>
                                        <span className='tags px-2'>interview</span>
                                        <span className='tags px-2'>google</span>
                                        <span className='tags px-2'>dsa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mark-complete px-2"><i className="fa-regular fa-circle-up fa-lg"></i><small className='px-2'>12</small></div>
                                <div className="mark-later px-2"><i className="fa-regular fa-eye fa-lg"></i><small className='px-2'>12k</small></div>

                            </div>
                        </div>
                    </div>
                    <div className="row p-2 ">
                        <div className="question  d-flex align-items-center justify-content-between ">
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className="number pfp">
                                    <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                                </div>

                                {/* <div className="status"></div> */}
                                <div className="title d-flex flex-column justify-content-center align-items-start">
                                    <a href='/discussion/interview/123' className="thread-title text-start">My interview experience at Google</a>
                                    <div className="dis-taglist d-flex jutify-content-center align-items-center">
                                        <a href="#" className='username'>kadash_shah</a>
                                        <span className='tags px-2'>interview</span>
                                        <span className='tags px-2'>google</span>
                                        <span className='tags px-2'>dsa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mark-complete px-2"><i className="fa-regular fa-circle-up fa-lg"></i><small className='px-2'>12</small></div>
                                <div className="mark-later px-2"><i className="fa-regular fa-eye fa-lg"></i><small className='px-2'>12k</small></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Discussion