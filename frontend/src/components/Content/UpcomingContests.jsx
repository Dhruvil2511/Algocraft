import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader.jsx";
import {toast,Bounce} from "react-toastify"
import { Link } from "react-router-dom";

const UpcomingContests = () => {
  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/contests/upcoming-contests`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setContestData(response.data.data.objects);
        setLoading(false);
      }
    } catch (error) {
      toast("Error fetching data from db", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  return (
    <div className="content-header">
      <h1>Upcoming Contests</h1>
      <p>
        Explore the exciting world of competitive programming with Algocraft's
        "Upcoming Coding Contests" feature. We bring you a centralized platform
        to stay informed about upcoming coding competitions from various
        sources. Whether you're a seasoned coder or just starting your
        competitive programming journey, this feature is designed to keep you in
        the loop.
      </p>

      {/* <div className="visualization py-2">visualization content here</div> */}
      <div className="d-flex flex-nowrap justify-content-start align-items-center">
        <div className="dropdown">
          <button
            className="options dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter
          </button>
          <ul className="dropdown-menu">
            <div className="search-filter d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass px-2"></i>
              <input type="text" className="me-2" />
            </div>
            <li>
              <Link className="dropdown-item" to="#">
                Leetcode
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Codeforces
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Codechef
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="daddy my-4 w-100 d-flex justify-content-center align-items-center">
        {loading ? (
          <div className="p-4 d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          // Show contest data once loaded
          <div className="my-2 table-list w-100" style={{ border: "none" }}>
            {contestData.map((contest, index) => {
              return (
                <div className="row p-1" key={contest.id}>
                  <div className="w-100 question d-flex align-items-center justify-content-between ">
                    <div style={{width:"50%"}} className="d-flex justify-content-start align-items-center">
                      <div className="number fs-5" style={{width:"10%"}}>{index + 1}</div>
                      <div className="pfp" style={{width:"10%"}}>
                          <img 
                          className="p-1"
                          style={{width:"40px",height:"40px"}}
                            src={`https://clist.by/media/sizes/32x32/img/resources/${contest.host.replace(
                              /[.\/]/g,
                              "_"
                            )}.png`}
                          />
                        </div>
                      <div style={{width:"70%"}} className="title d-flex justify-content-start align-items-center">
                      
                        <Link
                          className="text-start"
                          to={contest.href}
                          style={{
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "500px",
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contest.event} ({contest.host})
                        </Link>
                      </div>
                    </div>
                    <div style={{width:"30%"}} className="d-flex justify-content-end align-items-center">
                      <div className="mark-complete px-2">
                        <span>{new Date(contest.start).toLocaleString()}</span>{" "}
                        <button className="btn-list">
                          <i className="fa-solid fa-calendar-days fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingContests;
