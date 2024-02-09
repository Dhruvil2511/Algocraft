import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { allTags } from "../../constants/allTags.js";

import { Chart } from "chart.js/auto";
import {Pie} from "react-chartjs-2";

const CodingSheet = () => {
  const { author } = useParams();
  const { pathname } = useLocation();
  const [sheet, setSheet] = useState([]);
  const tagbutton = useRef();
  const anchorRefs = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataAvail, setIsDataAvail] = useState(true);
  const [isTagsVisible, setIsTagsVisible] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredTags, setFilteredTags] = useState(allTags);
  const [filterText, setFilterText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState();
  const [progress, setProgress] = useState(0);
  const [easyProgress, setEasyProgress] = useState(0);
  const [mediumProgress, setMediumProgress] = useState(0);
  const [hardProgress, setHardProgress] = useState(0);
  const [sheetId, setSheetId] = useState();
  const [totalQuestions, setTotalQuestions] = useState();
  const [easySolved, setEasySolved] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);
  const [totalEasy, setTotalEasy] = useState(0);
  const [totalMedium, setTotalMedium] = useState(0);
  const [totalHard, setTotalHard] = useState(0);
  const [analysisToggle, setAnalysisToggle] = useState(false);
  const perPage = 50;

  const fetchQuestions = async () => {
    // console.log(author, currentPage, perPage, selectedDifficulty, selectedTags);
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/sheets/get-sheet", {
        params: {
          sheet_author: author,
          page: currentPage,
          limit: perPage,
          difficulty: selectedDifficulty,
          selectedTags: selectedTags,
          status: status,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setIsDataAvail(true);
          setSheet(res.data.data?.sheet_data);
          setSheetId(res.data.data?._id);
          setTotalQuestions(res.data.data?.totalQuestions);
          setTotalEasy(res.data.data?.totalEasy);
          setTotalMedium(res.data.data?.totalMedium);
          setTotalHard(res.data.data?.totalHard);
          setProgress(0);
          setEasyProgress(0);
          setMediumProgress(0);
          setHardProgress(0);
        }
      })
      .catch((err) => {
        setIsDataAvail(false);
        setSheet([]);
        console.error(err);
      });
  };

  const fetchUser = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchQuestions();
    return () => {};
  }, [currentPage, selectedDifficulty, selectedTags, status]);

  const labels = ["January", "February", "March", "April", "May", "June"];

  // Defined an object.
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0,0,255)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  function countProgress(count, total) {
    return Math.floor((count / total) * 100);
  }
  useEffect(() => {
    if (user && sheetId) {
      let count = 0;
      let easyCount = 0;
      let mediumCount = 0;
      let hardCount = 0;

      for (const q of user.solvedQuestions) {
        if (q.questionFrom === sheetId) {
          count++;
          if (q.difficulty === "Easy") easyCount++;
          else if (q.difficulty === "Medium") mediumCount++;
          else if (q.difficulty === "Hard") hardCount++;
        }
      }
      setEasySolved(easyCount);
      setMediumSolved(mediumCount);
      setHardSolved(hardCount);
      setProgress(countProgress(count, totalQuestions));
      setEasyProgress(countProgress(easyCount, totalEasy));
      setMediumProgress(countProgress(mediumCount, totalMedium));
      setHardProgress(countProgress(hardCount, totalHard));
    }
  }, [sheetId, user]);

  const calculateDisplayedNumber = (index) => {
    return (currentPage - 1) * perPage + index + 1;
  };
  function getPrevPage(event) {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  }
  function getNextPage() {
    if (!isDataAvail) return;
    setCurrentPage(currentPage + 1);
  }

  function toggleTags() {
    if (isTagsVisible) tagbutton.current.innerText = "Show Tags";
    else tagbutton.current.innerText = "Hide Tags";

    setIsTagsVisible(!isTagsVisible);
  }
  function getColor(difficulty) {
    switch (difficulty) {
      case "Easy":
        return "green";
      case "Medium":
        return "orange";
      case "Hard":
        return "red";
      default:
        return "var(--mainTextColor)";
    }
  }

  function handleFilterChange(event) {
    const value = event.target.value;
    setFilterText(value);
    const filtered = allTags.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTags(filtered);
  }

  function handleSelectTag(tg) {
    if (!selectedTags.includes(tg)) {
      setSelectedTags((prevTags) => [...prevTags, tg]);
    }
  }

  function removeSelectTag(idx) {
    setSelectedTags((prevTags) => prevTags.filter((_, i) => i !== idx));
  }

  const isActive = (path) => {
    return path === pathname ? "selected" : "";
  };

  const saveQuestion = async (questionId) => {
    if (!questionId || questionId.trim() === "") return;

    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/sheets/save-question",
        { questionId: questionId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          // console.log(data);
          fetchUser();
        }
      })
      .catch((err) => console.error(err));
  };
  const markQuestion = async (questionId) => {
    if (!questionId || questionId.trim() === "") return;

    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/sheets/mark-question",
        { questionId: questionId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.
          fetchUser();
        }
      })
      .catch((err) => console.error(err));
  };

  function handlePickQuestion() {
    const anchors = anchorRefs.current;

    if (anchors.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * anchors.length);
    anchors[randomIndex].click();
  }
  return (
    <>
      <div className="content-header">
        <h1>Coding Sheets</h1>
        <p>
          Looking for a convenient way to access a variety of coding practice
          sheets from different sources? Look no further than Coding Sheets, a
          feature on the Algocraft website. Not only can you find a wide range
          of sheets all in one place, but the included analysis graphs make
          solving them even more enjoyable by allowing you to track your
          progress. Plus, a discussion section is coming soon to provide support
          and guidance as you work through each sheet. Happy coding!
        </p>

        <div className="main-sheet py-2">
          <div className="sheets d-flex flex-wrap">
            <a
              className={`sheet ${isActive("/coding-sheets/striver")}`}
              href="/coding-sheets/striver"
            >
              Striver
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/love_babbar")}`}
              href="/coding-sheets/love_babbar"
            >
              Love Babbar
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/leetcode_top")}`}
              href="/coding-sheets/leetcode_top"
            >
              Leetcode Top
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/blind75")}`}
              href="/coding-sheets/blind75"
            >
              Blind 75
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/apna_college")}`}
              href="/coding-sheets/apna_college"
            >
              Apna College
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/neetcode150")}`}
              href="/coding-sheets/neetcode150"
            >
              Neetcode 150
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/fraz")}`}
              href="/coding-sheets/fraz"
            >
              Fraz
            </a>
            <a
              className={`sheet ${isActive("/coding-sheets/neetcode300")}`}
              href="/coding-sheets/neetcode300"
            >
              Neetcode 300
            </a>
          </div>
        </div>
        <div className="author alert bg-success">
          All credits goes href {author}
        </div>
        <div className="progress-section py-2">
          <span> Progress :</span>
          <div
            className="progress"
            role="progressbar"
            aria-label="Example with label"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar bg-success progress-bar-striped progress-bar-animated"
              style={{
                width: `${progress}%`,
              }}
            >
              {progress}%
            </div>
          </div>
        </div>
        <div className="my-2">
          <button
            className="options"
            style={{ margin: "0" }}
            onClick={() => setAnalysisToggle(!analysisToggle)}
          >
            Analysis <i className="fa-solid fa-chart-pie"></i>
          </button>
        </div>
        {analysisToggle ? (
          <div className="daddy d-flex justify-content-around align-items-center my-4  visualization py-2">
            <div
              className="daddy d-flex  p-3 justify-content-center align-items-center"
              style={{ width: "40%", border: "1px solid var(--mainTextColor)" }}
            >
              <div className="bars w-100">
                <span>
                  Easy &nbsp;&nbsp;&nbsp; <strong>{easySolved}</strong>/
                  {totalEasy}
                </span>
                <div
                  className="progress m-2"
                  role="progressbar"
                  aria-label="Success example"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${easyProgress}%` }}
                  >
                    {easyProgress}%
                  </div>
                </div>
                <span>
                  Medium&nbsp;&nbsp;&nbsp; <strong>{mediumSolved}</strong>/
                  {totalMedium}
                </span>
                <div
                  className="progress m-2"
                  role="progressbar"
                  aria-label="Warning example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${mediumProgress}%` }}
                  >
                    {mediumProgress}%
                  </div>
                </div>
                <span>
                  Hard&nbsp;&nbsp;&nbsp; <strong>{hardSolved}</strong>/
                  {totalHard}
                </span>
                <div
                  className="progress m-2"
                  role="progressbar"
                  aria-label="Danger example"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: `${hardProgress}%` }}
                  >
                    {hardProgress}%
                  </div>
                </div>
              </div>
            </div>
            <div
              className="    d-flex  p-3 justify-content-center align-items-center"
              style={{ width: "40%" }}
            >
              <Pie data={data} />
            </div>
          </div>
        ) : null}

        <div className="d-flex flex-wrap justify-content-between align-items-center w-100 daddy my-4">
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div className="dropdown ">
              <button
                className="options dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Difficulty
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item text-success"
                    onClick={() => setSelectedDifficulty("Easy")}
                  >
                    Easy
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-warning"
                    onClick={() => setSelectedDifficulty("Medium")}
                  >
                    Medium
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => setSelectedDifficulty("Hard")}
                  >
                    Hard
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedDifficulty("")}
                    style={{ color: "var(--mainTextColor)" }}
                  >
                    All
                  </button>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className=" options dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Status
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setStatus("Solved")}
                    style={{ color: "var(--mainTextColor)" }}
                  >
                    Solved
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setStatus("Marked")}
                    style={{ color: "var(--mainTextColor)" }}
                  >
                    Marked
                  </button>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="options dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>
              <ul
                className="dropdown-menu"
                style={{ overflowY: "auto", maxHeight: "200px" }}
              >
                <div className="search-filter d-flex align-items-center">
                  <i className="fa-solid fa-magnifying-glass px-2"></i>
                  <input
                    type="text"
                    className="me-2"
                    onChange={handleFilterChange}
                  />
                </div>
                {filteredTags.map((tg, idx) => (
                  <li key={idx + 1}>
                    <button
                      className="dropdown-item"
                      style={{ color: "var(--mainTextColor)" }}
                      onClick={() => handleSelectTag(tg)}
                    >
                      {tg}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <div className="hidetag">
              <button onClick={toggleTags} className="options" ref={tagbutton}>
                Hide tags
              </button>
            </div>
            <div className="random">
              <button className="options" onClick={handlePickQuestion}>
                <i
                  className="fa-solid fa-shuffle pe-2"
                  style={{ color: "#63E6BE" }}
                ></i>
                Pick random
              </button>
            </div>
          </div>
        </div>
        <div className="selected-tags py-2 d-flex justify-content-center align-items-center">
          {status ? (
            <div
              className="tags px-2  d-flex justify-content-center align-items-center"
              style={{ width: "fit-content" }}
            >
              <span>{status}</span>
              <button
                style={{ background: "transparent", border: "none" }}
                onClick={() => setStatus("")}
              >
                {" "}
                <i className="fa-solid fa-xmark"></i>{" "}
              </button>
            </div>
          ) : null}
          <span
            className="mx-2"
            style={{ color: getColor(selectedDifficulty) }}
          >
            {selectedDifficulty}
          </span>
          {selectedTags.map((tg, index) => (
            <div
              key={index + 1}
              className="tags px-2  d-flex justify-content-center align-items-center"
              style={{ width: "fit-content" }}
            >
              <span>{tg}</span>
              <button
                style={{ background: "transparent", border: "none" }}
                onClick={() => removeSelectTag(index)}
              >
                {" "}
                <i className="fa-solid fa-xmark"></i>{" "}
              </button>
            </div>
          ))}
        </div>
        <div className="daddy my-4 w-100 d-flex  align-items-center">
          <div className="my-2 table-list w-100" style={{ border: "none" }}>
            {!isDataAvail ? (
              <div className="p-5 d-flex justify-content-center align-items-center flex-column">
                <i className="p-3 fa-solid fa-ban fa-2xl text-danger"></i>
                <span className="fs-4">That's it for now!</span>
              </div>
            ) : null}
            {sheet?.map((question, index) => (
              <div className="row w-100 p-2 " key={uuidv4()}>
                <div className="question  d-flex align-items-center justify-content-between ">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="number">
                      {calculateDisplayedNumber(index)}
                    </div>
                    {/* <div className="status"></div> */}
                    <div className="title d-flex flex-column justify-content-center align-items-start">
                      <div className="text-start d-flex justify-content-center align-items-center">
                        <a
                          ref={(el) => (anchorRefs.current[index] = el)}
                          style={{ textDecoration: "none" }}
                          href={question.problemlink}
                          target="_blank"
                          rel="noreffrer"
                        >
                          {question.title}
                        </a>
                        <span
                          className="ms-3 fs-6"
                          style={{ color: getColor(question.difficulty) }}
                        >
                          ({question.difficulty})
                        </span>
                      </div>
                      <div className="taglist d-flex jutify-content-center align-items-center">
                        {isTagsVisible &&
                          question.problemTags?.map((tag, index) => (
                            <span key={index + 1} className="tags px-2">
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="mark-complete px-2">
                      <button
                        className="btn-list"
                        onClick={() => markQuestion(question._id)}
                      >
                        {user &&
                        user.solvedQuestions.some(
                          (ques) => ques._id === question._id
                        ) ? (
                          <i
                            className="fa-solid fa-circle-check fa-lg"
                            style={{ color: "#63E6BE" }}
                          ></i>
                        ) : (
                          <i className="fa-regular fa-circle-check fa-lg"></i>
                        )}
                      </button>
                    </div>
                    <div className="mark-later px-2">
                      {/* {console.log(question)} */}
                      <button
                        className="btn-list"
                        onClick={() => saveQuestion(question._id)}
                      >
                        {user &&
                        user.bookmarkedQuestions.includes(question._id) ? (
                          <i className="fa-solid fa-bookmark fa-lg"></i>
                        ) : (
                          <i className="fa-regular fa-bookmark fa-lg"></i>
                        )}
                      </button>
                    </div>
                    <div className="solution px-2">
                      <a href="#" className="btn-list">
                        <i
                          className="fa-brands fa-youtube fa-lg"
                          style={{ color: "#ff0000" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination d-flex justify-content-evenly h-10 align-items-center">
          <div className="prev">
            <button
              className="btn btn-outline"
              style={{ backgroundColor: "#0D6EFD" }}
              onClick={() => getPrevPage()}
            >
              <i className="fa-solid fa-arrow-left"></i>Prev
            </button>
          </div>
          <div className="text d-flex justify-content-center align-items-center">
            {currentPage}
            {/* <input type="text" style={{width:"20px"}} /> {190/perPage} */}
          </div>
          <div className="next">
            <button
              className="btn btn-outline"
              style={{ backgroundColor: "#0D6EFD" }}
              onClick={() => getNextPage()}
            >
              Next<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CodingSheet;
