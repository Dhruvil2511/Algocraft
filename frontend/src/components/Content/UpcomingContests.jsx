import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader.jsx";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";

const UpcomingContests = () => {
  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const fetchContest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/contests/upcoming-contests`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setContestData(response.data.data.objects);
        setOriginalData(response.data.data.objects);
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

  function handleSearchSubmit(event) {
    event.preventDefault();
    // console.log(query);
    if (query.trim() === "") {
      setContestData(originalData);
      return;
    }
    const filteredContests = originalData.filter((contest) => {
      // console.log(contest);
      return (
        contest.host.toLowerCase().includes(query.toLowerCase()) ||
        contest.event.toLowerCase().includes(query.toLowerCase())
      );
    });
    // setQuery("");
    setContestData(filteredContests);
  }

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
        <form onSubmit={handleSearchSubmit} className="w-100">
          <div className="searchBox me-3 w-100">
            <input
              className="searchInput"
              type="text"
              name="search"
              required
              value={query}
              placeholder="Search title .."
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="searchButton">
              <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </button>
          </div>
        </form>
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
                    <div
                      style={{ width: "50%" }}
                      className="d-flex justify-content-start align-items-center"
                    >
                      <div className="number fs-5" style={{ width: "10%" }}>
                        {index + 1}
                      </div>
                      <div style={{width:"90%"}} className="d-flex icon-name justify-content-start align-items-center">
                        <div className="pfp contest-pfp" style={{ width: "10%" }}>
                          <img
                            className="p-1"
                            style={{ width: "40px", height: "40px" }}
                            src={`https://clist.by/media/sizes/32x32/img/resources/${contest.host.replace(
                              /[.\/]/g,
                              "_"
                            )}.png`}
                            alt="X"
                          />
                        </div>
                        <div
                          style={{ width: "70%" }}
                          className="title d-flex justify-content-start align-items-center"
                        >
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
                            {contest.host.split(".")[0].toUpperCase()} -{" "}
                            {contest.event}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ width: "30%" }}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <div className="mark-complete px-2">
                        <span>{new Date(contest.start).toLocaleString()}</span>{" "}
                        {/* <Link
                          className="btn-list"
                          to={`calender.google.com/calender/u/0/r/eventedit?text=${
                            contest.host.split(".")[0].toUpperCase() +
                            contest.event
                          }&details=url:+${contest.href}`}
                        > */}
                          <i className="fa-solid fa-calendar-days fa-lg"></i>
                        {/* </Link> */}
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
