import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';

const Profile = () => {
    return (
        <>
            <div className="content-header d-flex flex-column justify-content-center w-100 ">
                <div className="profile-menu d-flex justify-content-between align-items-center w-100">
                    <div className="daddy omg2 p-3 me-2 " >
                        <div className="d-flex justify-content-center align-items-center flex-column w-100">
                            <div className="profile m-2 d-flex justify-content-between align-items-center w-100">
                                <div className="streak  d-flex justify-content-center align-items-center">
                                    <CircularProgress sx={{ '--CircularProgress-size': '80px' }} determinate value={66.67}>
                                        2 / 3
                                    </CircularProgress>
                                    <div className='m-3'>
                                        <span className='text-underline'>Streaks</span>
                                    </div>
                                </div>
                                <div className="detail d-flex justify-content-center align-items-center">
                                    <div className="naming flex-column d-flex justify-content-center align-items-center m-1">
                                        <span className='text-end w-100'>Kalash Shah</span>
                                        <span className='text-end w-100 '>kalash_shah_99</span>
                                    </div>
                                    <div className="rounded-square-pfp m-1">
                                        <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                                    </div>
                                </div>
                            </div>
                            <div className="info w-100  m-2 mt-3 d-flex justify-content-around align-items center">
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <i className="fa-regular fa-star"></i>
                                    <small>value</small>
                                </div>
                                <div className='d-flex justify-content-center align-items-center flex-column'><i className="fa-solid fa-location-dot"></i>                                    <small>value</small>
                                </div>
                                <div className='d-flex justify-content-center align-items-center flex-column'><i className="fa-brands fa-github"></i>                                    <small>value</small>
                                </div>
                                <div className='d-flex justify-content-center align-items-center flex-column'><i className="fa-brands fa-linkedin"></i>                                    <small>value</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="daddy omg p-3 ms-2">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="bars w-100">
                                <span>Easy</span>
                                <div className="progress m-2" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar bg-success" style={{ width: "25%" }}></div>
                                </div>
                                <span>Medium</span>
                                <div className="progress m-2" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar bg-warning" style={{ width: "75%" }}></div>
                                </div>
                                <span>Hard</span>
                                <div className="progress m-2" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar bg-danger" style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="d-flex flex-wrap justify-content-start align-items-center w-100 daddy my-4">
                    <button className='p-2 m-2' style={{ background: 'var(--itemColor)', borderRadius: '8px' }}>Marked Question</button>
                    <button className='p-2 m-2' style={{ background: 'var(--itemColor)', borderRadius: '8px' }}>Followed friends</button>
                </div>
                <div className="daddy my-4 w-100 d-flex  align-items-center">
                    <div className="my-2 table-list w-100" style={{ border: 'none' }}>
                        <div className="row w-100 p-2 ">
                            <div className="question  d-flex align-items-center justify-content-between ">
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
                                    <div className="mark-complete px-2"><button className='btn-list'><i className="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></button></div>
                                    <div className="mark-later px-2"><button className="btn-list"><i className="fa-solid fa-bookmark fa-lg"></i></button></div>
                                    <div className="solution px-2"><a href="#" className='btn-list'><i className="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></a></div>

                                </div>
                            </div>
                        </div>
                        <div className="row w-100 p-2">
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
                                    <div className="mark-complete px-2"><button className='btn-list'><i className="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></button></div>
                                    <div className="mark-later px-2"><button className="btn-list"><i className="fa-solid fa-bookmark fa-lg"></i></button></div>
                                    <div className="solution px-2"><a href="#" className='btn-list'><i className="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></a></div>

                                </div>
                            </div>
                        </div>
                        <div className="row w-100 p-2">
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
                                    <div className="mark-complete px-2"><button className='btn-list'><i className="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></button></div>
                                    <div className="mark-later px-2"><button className="btn-list"><i className="fa-solid fa-bookmark fa-lg"></i></button></div>
                                    <div className="solution px-2"><a href="#" className='btn-list'><i className="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></a></div>

                                </div>
                            </div>
                        </div>
                        <div className="row w-100 p-2">
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
                                    <div className="mark-complete px-2"><button className='btn-list'><i className="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></button></div>
                                    <div className="mark-later px-2"><button className="btn-list"><i className="fa-solid fa-bookmark fa-lg"></i></button></div>
                                    <div className="solution px-2"><a href="#" className='btn-list'><i className="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></a></div>

                                </div>
                            </div>
                        </div>
                        <div className="row w-100 p-2">
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
                                    <div className="mark-complete px-2"><button className='btn-list'><i className="fa-solid fa-circle-check fa-lg" style={{ color: '#63E6BE' }}></i></button></div>
                                    <div className="mark-later px-2"><button className="btn-list"><i className="fa-solid fa-bookmark fa-lg"></i></button></div>
                                    <div className="solution px-2"><a href="#" className='btn-list'><i className="fa-brands fa-youtube fa-lg" style={{ color: "#ff0000" }}></i></a></div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile