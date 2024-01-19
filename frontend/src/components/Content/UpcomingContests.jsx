import React, { useEffect } from 'react'

const UpcomingContests = () => {

  return (
    <div className="content-header">
      <h1>Upcoming Contests</h1>
      <p>Explore the exciting world of competitive programming with Algocraft's "Upcoming Coding Contests" feature. We bring you a centralized platform to stay informed about upcoming coding competitions from various sources. Whether you're a seasoned coder or just starting your competitive programming journey, this feature is designed to keep you in the loop.</p>

      <div className="visualization py-2">visualiztion content here</div>
      <div className="d-flex flex-nowrap justify-content-start align-items-center">

        <div className="dropdown">
          <button className="options dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul className="dropdown-menu">
            <div className="search-filter d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass px-2"></i>
              <input type="text" className='me-2' />
            </div>
            <li><a className="dropdown-item" href="#">Leetcode</a></li>
            <li><a className="dropdown-item" href="#">Codeforces</a></li>
            <li><a className="dropdown-item" href="#">Codechef</a></li>
          </ul>
        </div>

      </div>

      <div className="my-2 table-list p-1">
        <div className="row p-2 ">
          <div className="question  d-flex align-items-center justify-content-between ">
            <div className='d-flex justify-content-center align-items-center'>
              <div className="number">1</div>
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
              <div className="mark-complete px-2"><button className='btn-list'><i class="fa-solid fa-calendar-days fa-lg"></i></button></div>
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
              <div className="mark-complete px-2"><button className='btn-list'><i class="fa-solid fa-calendar-days fa-lg"></i></button></div>


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
              <div className="mark-complete px-2"><button className='btn-list'><i class="fa-solid fa-calendar-days fa-lg"></i></button></div>

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
              <div className="mark-complete px-2"><button className='btn-list'><i class="fa-solid fa-calendar-days fa-lg"></i></button></div>

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
              <div className="mark-complete px-2"><button className='btn-list'><i class="fa-solid fa-calendar-days fa-lg"></i></button></div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UpcomingContests