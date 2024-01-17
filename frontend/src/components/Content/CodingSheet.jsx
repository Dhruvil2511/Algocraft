import React from 'react'


const CodingSheet = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="container main-container">
                <div className="content-header">
                    <h1>Coding Sheets</h1>
                    <p>Looking for a convenient way to access a variety of coding practice sheets from different sources? Look no further than Coding Sheets, a feature on the Algocraft website. Not only can you find a wide range of sheets all in one place, but the included analysis graphs make solving them even more enjoyable by allowing you to track your progress. Plus, a discussion section is coming soon to provide support and guidance as you work through each sheet. Happy coding!</p>

                    <div className="main-sheet py-2">
                        <div className="sheets d-flex flex-wrap">
                            <a className='sheet selected' href="#">Striver</a>
                            <a className='sheet' href="/">love babbar</a>
                            <a className='sheet' href="/">leetcode</a>
                            <a className='sheet' href="/">neetcode</a>
                            <a className='sheet' href="/">apna college</a>
                            <a className='sheet' href="/">blind 75</a>
                            <a className='sheet' href="/">fraz</a>
                            <a className='sheet' href="/">adsada</a>
                            <a className='sheet' href="/">Custom</a>
                        </div>
                    </div>
                    <div className="progress-section py-2">
                        <span> Progress :</span>
                        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-success" style={{ width: '25%' }}>25%</div>
                        </div>
                    </div>
                    <div className="visualization py-2">visualiztion content here</div>
                    <div className="d-flex flex-nowrap">
                        <div class="dropdown">
                            <button class="options dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Difficulty
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Easy</a></li>
                                <li><a class="dropdown-item" href="#">Medium</a></li>
                                <li><a class="dropdown-item" href="#">Hard</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class=" options dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Status
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Solved</a></li>
                                <li><a class="dropdown-item" href="#">Marked</a></li>
                                <li><a class="dropdown-item" href="#">Unsolved</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class="options dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter
                            </button>
                            <ul class="dropdown-menu">
                                <div className="search-filter d-flex align-items-center">
                                    <i class="fa-solid fa-magnifying-glass px-2"></i>
                                    <input type="text" className='me-2' />
                                </div>
                                <li><a class="dropdown-item" href="#">array</a></li>
                                <li><a class="dropdown-item" href="#">dp</a></li>
                                <li><a class="dropdown-item" href="#">matrix</a></li>
                            </ul>
                        </div>
                        <div className="hidetag">
                            <button className='options'>hide tags</button>
                        </div>
                        <div className="random">
                            <button className='options'>random</button>
                        </div>
                    </div>
                    <div className="selected-tags py-2">selected tags here</div>
                    <div className="my-2 table-list">
                        <div className="row p-2">
                            <div className="question d-flex align-items-center justify-content-between ">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="number">1</div>
                                    {/* <div className="status"></div> */}
                                    <div className="title d-flex flex-column justify-content-center align-items-start">
                                        <div className="text-start">2 Sum</div>
                                        <div className="taglist d-flex jutify-content-center align-items-center">
                                            <span className='tags px-2'>array</span>
                                            <span className='tags px-2'>maths</span>
                                            <span className='tags px-2'>maths</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mark-complete px-2"><i class="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></div>
                                    <div className="mark-later px-2"><i class="fa-solid fa-bookmark fa-lg"></i></div>
                                    <div className="solution px-2"><i class="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></div>

                                </div>  
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="question d-flex align-items-center justify-content-between ">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="number">1</div>
                                    {/* <div className="status"></div> */}
                                    <div className="title d-flex flex-column justify-content-center align-items-start">
                                        <div className="text-start">2 Sum</div>
                                        <div className="taglist d-flex jutify-content-center align-items-center">
                                            <span className='tags px-2'>array</span>
                                            <span className='tags px-2'>maths</span>
                                            <span className='tags px-2'>maths</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mark-complete px-2"><i class="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></div>
                                    <div className="mark-later px-2"><i class="fa-solid fa-bookmark fa-lg"></i></div>
                                    <div className="solution px-2"><i class="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></div>

                                </div>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="question d-flex align-items-center justify-content-between ">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="number">1</div>
                                    {/* <div className="status"></div> */}
                                    <div className="title d-flex flex-column justify-content-center align-items-start">
                                        <div className=" text-start">2 Sum</div>
                                        <div className="taglist d-flex jutify-content-center align-items-center">
                                            <span className='tags px-2'>array</span>
                                            <span className='tags px-2'>maths</span>
                                            <span className='tags px-2'>maths</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mark-complete px-2"><i class="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></div>
                                    <div className="mark-later px-2"><i class="fa-solid fa-bookmark fa-lg"></i></div>
                                    <div className="solution px-2"><i class="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></div>

                                </div>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="question d-flex align-items-center justify-content-between ">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="number">1</div>
                                    {/* <div className="status"></div> */}
                                    <div className="title d-flex flex-column justify-content-center align-items-start">
                                        <div className=" text-start">2 Sum</div>
                                        <div className="taglist d-flex jutify-content-center align-items-center">
                                            <span className='tags px-2'>array</span>
                                            <span className='tags px-2'>maths</span>
                                            <span className='tags px-2'>maths</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mark-complete px-2"><i class="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></div>
                                    <div className="mark-later px-2"><i class="fa-solid fa-bookmark fa-lg"></i></div>
                                    <div className="solution px-2"><i class="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></div>

                                </div>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="question d-flex align-items-center justify-content-between ">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="number">1</div>
                                    {/* <div className="status"></div> */}
                                    <div className="title d-flex flex-column justify-content-center align-items-start">
                                        <div className=" text-start">2 Sum</div>
                                        <div className="taglist d-flex jutify-content-center align-items-center">
                                            <span className='tags px-2'>array</span>
                                            <span className='tags px-2'>maths</span>
                                            <span className='tags px-2'>maths</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="mark-complete px-2"><i class="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></div>
                                    <div className="mark-later px-2"><i class="fa-solid fa-bookmark fa-lg"></i></div>
                                    <div className="solution px-2"><i class="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodingSheet;