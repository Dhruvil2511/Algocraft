import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { allTags } from "../../constants/allTags.js";
import Loader from "./Loader.jsx";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";
import { Chart, ArcElement, Colors } from "chart.js/auto";
Chart.register(ArcElement);
Chart.register(Colors);
const CodingSheet = () => {
  const { author } = useParams();
  const { pathname } = useLocation();
  const [sheet, setSheet] = useState([]);
  const tagbutton = useRef();
  const anchorRefs = useRef([]);
  const [solvedData, setSolvedData] = useState({});
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
  const [isLoading, setIsLoading] = useState(true);
  const [totalSolvedQuestions, setTotalSolvedQuestions] = useState(null);
  const perPage = 50;

  const fetchUser = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setUser(data.user);
          // console.log(data.user.solvedQuestions);
          setTotalSolvedQuestions(data.user.solvedQuestions);
        }
      })
      .catch((err) => {
        const { status, userMessage } = err.response.data;
        // console.log(userMessage)
        toast(userMessage, {
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
      });
  };
  const fetchQuestions = async () => {
    // console.log(author, currentPage, perPage, selectedDifficulty, selectedTags);
    setIsLoading(true);
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
          setIsLoading(false);
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
        toast("Server error fetching questions", {
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
        setIsDataAvail(false);
        setSheet([]);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUser();
    fetchQuestions();
    return () => {};
  }, [currentPage, selectedDifficulty, selectedTags, status, author]);

  const data = {
    labels: Object.keys(solvedData),
    datasets: [
      {
        data: Object.values(solvedData),
        hoverOffset: 10,
        backgroundColor: [
          "#90EEB9",
          "#99DDFF",
          "#FFCC99",
          "#CC99FF",
          "#FFFF99",
          "#99FFCC",
          "#FF9999",
          "#99FFFF",
          "#FFCCFF",
          "#CCFF99",
          "#FF99FF",
          "#CCFFCC",
          "#FFCCCC",
          "#CCCCFF",
          "#FFCCCC",
          "#CCFFFF",
          "#FFCCFF",
          "#CCFFCC",
          "#FF99FF",
          "#CCFF99",
          "#FF99CC",
          "#99CCFF",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
          "#FFCCFF",
          "#CCFFFF",
          "#FF99FF",
          "#CCFF99",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
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
  }, [sheetId, user, sheet, author]);

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
      .catch((err) => {
        toast("Error saving question", {
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
        console.error(err);
      });
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
          fetchUser();
          calculatePie();
        }
      })
      .catch((err) => {
        toast("Error marking question", {
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
      });
  };

  function handlePickQuestion() {
    const anchors = anchorRefs.current;

    if (anchors.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * anchors.length);
    anchors[randomIndex].click();
  }

  function calculatePie() {
    if (totalSolvedQuestions) {
      const counts = {};

      for (const question of totalSolvedQuestions) {
        if (question.questionFrom === sheetId) {
          // console.log(question.questionFrom, sheetId);
          for (const tag of question?.problemTags) {
            if (allTags.includes(tag)) {
              counts[tag] = (counts[tag] || 0) + 1;
            }
          }
        }
      }
      setSolvedData(counts);
    }
  }
  function handleAnalysisToggle() {
    setAnalysisToggle(!analysisToggle);
    calculatePie();
  }
  return (
    <>
      <div className="content-header">
        <h1>Coding Sheets</h1>
        <p>
          Are you searching for an effortless method to access diverse coding
          practice materials sourced from various platforms?
          <br />
          Your quest ends with Algocraft. Dive into a vast collection of coding
          sheets conveniently consolidated in one location. Elevate your coding
          experience with insightful analysis charts that enhance your
          problem-solving journey by monitoring your advancement.Stay tuned for
          the upcoming interactive discussion forum designed to offer assistance
          and valuable insights as you tackle each practice sheet.
          <br />
          Crack Code, Craft Careers.
        </p>

        <div className="main-sheet py-2">
          <div className="sheets d-flex flex-wrap">
            <Link
              className={`sheet ${isActive("/coding-sheets/striver")}`}
              to="/coding-sheets/striver"
            >
              Striver
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/love_babbar")}`}
              to="/coding-sheets/love_babbar"
            >
              Love Babbar
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/leetcode_top")}`}
              to="/coding-sheets/leetcode_top"
            >
              Leetcode Top
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/blind75")}`}
              to="/coding-sheets/blind75"
            >
              Blind 75
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/apna_college")}`}
              to="/coding-sheets/apna_college"
            >
              Apna College
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/neetcode150")}`}
              to="/coding-sheets/neetcode150"
            >
              Neetcode 150
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/fraz")}`}
              to="/coding-sheets/fraz"
            >
              Fraz
            </Link>
            <Link
              className={`sheet ${isActive("/coding-sheets/neetcode300")}`}
              to="/coding-sheets/neetcode300"
            >
              Neetcode 300
            </Link>
          </div>
        </div>
        <div className="author alert bg-success ">
          <span className="text-warning fs-3">
            All credits goes to {author}.{" "}
          </span>
          <br />
          <p className="text-white">
            Your contribution enables us to create a vibrant community platform.
            <br />
            This project is purely for project purposes and not monetized or no
            intention to earn from it.
          </p>
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
            onClick={handleAnalysisToggle}
          >
            Analysis <i className="fa-solid fa-chart-pie"></i>
          </button>
        </div>
        {/* {console.log(analysisToggle)} */}
        {analysisToggle && (
          <div className="daddy d-flex justify-content-around align-items-center my-4  visualization py-2 ">
            <div
              className="daddy pehla-beta d-flex  p-3 justify-content-center align-items-center"
              style={{
                width: "40%",
                border: "1px solid var(--mainTextColor)",
              }}
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
              className="d-flex dusra-beta p-3 justify-content-center align-items-center"
              style={{ width: "40%" }}
            >
              <Doughnut data={data} options={options} />
            </div>
          </div>
        )}

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

          <div className="d-flex justify-content-center align-items-center flex-wrap">
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
        <div className="daddy my-4 w-100 d-flex justify-content-center  align-items-center">
          {isLoading ? (
            <div className="p-4 d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          ) : (
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
                        <div className="text-start bahar-nahi d-flex justify-content-center align-items-center">
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
                        <div className="taglist d-flex jutify-content-center align-items-center flex-wrap">
                          {isTagsVisible &&
                            question.problemTags?.map((tag, index) => (
                              <span key={index + 1} className="tags px-2 ">
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
          )}
        </div>
        <div className="pagination d-flex justify-content-evenly h-10 align-items-center">
          <div className="prev">
            <button
              className="btn-list "
              style={{ backgroundColor: "#0D6EFD", borderRadius: "16px" }}
              onClick={() => getPrevPage()}
            >
              <i className="fa-solid fa-arrow-left"></i>Prev
            </button>
          </div>
          <div className="text d-flex justify-content-center align-items-center">
            {currentPage}
          </div>
          <div className="next">
            <button
              className="btn-list"
              style={{ backgroundColor: "#0D6EFD", borderRadius: "16px" }}
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
