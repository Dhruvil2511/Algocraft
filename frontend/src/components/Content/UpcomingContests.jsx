import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader.jsx";
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
      console.error("Error fetching data from db");
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
              <a className="dropdown-item" href="#">
                Leetcode
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Codeforces
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Codechef
              </a>
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
                  <div className="question d-flex align-items-center justify-content-between ">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="number fs-5">{index + 1}</div>
                      <div className="title d-flex justify-content-center align-items-center">
                        <div className="pfp">
                          <img
                            src={`https://clist.by/media/sizes/32x32/img/resources/${contest.host.replace(
                              /[.\/]/g,
                              "_"
                            )}.png`}
                          />
                        </div>
                        <a
                          className="text-start"
                          href={contest.href}
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
                          {contest.event}
                        </a>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
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
