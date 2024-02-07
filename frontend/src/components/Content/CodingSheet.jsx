import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CodingSheet = () => {
  const { author } = useParams();
  const [sheet, setSheet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataAvail, setIsDataAvail] = useState(true);
  const perPage = 50;

  const fetchQuestions = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/sheets/get-sheet", {
        params: {
          sheet_author: author,
          page: currentPage,
          limit: perPage,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.data)
          setIsDataAvail(true);
          setSheet(res.data.data?.sheet_data);
        }
      })
      .catch((err) => {
        setIsDataAvail(false);
        setSheet([]);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchQuestions();
    return () => {};
  }, [currentPage]);

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
            <a className="sheet selected" href="/coding-sheets/striver">
              Striver
            </a>
            <a className="sheet" href="/coding-sheets/love_babbar">
              love babbar
            </a>
            <a className="sheet" href="/coding-sheets/leetcode">
              leet code
            </a>
            <a className="sheet" href="/coding-sheets/neetcode75">
              neet code
            </a>
            <a className="sheet" href="/coding-sheets/apna_college">
              apna college
            </a>
            <a className="sheet" href="/coding-sheets/neetcode150">
              neetcode 150
            </a>
            <a className="sheet" href="/coding-sheets/fraz">
              fraz
            </a>
            <a className="sheet" href="/coding-sheets/neetcode300">
              neet code 300
            </a>
            <a className="sheet" href="/">
              custom
            </a>
          </div>
        </div>
        <div className="author alert bg-success">
          All credits goes to {author}
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
            <div className="progress-bar bg-success" style={{ width: "25%" }}>
              25%
            </div>
          </div>
        </div>
        <div className="visualization py-2">visualiztion content here</div>
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
                  <a className="dropdown-item text-success" href="#">
                    Easy
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-warning" href="#">
                    Medium
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-danger" href="#">
                    Hard
                  </a>
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
                  <a className="dropdown-item" href="#">
                    Solved
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Marked
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Unsolved
                  </a>
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
              <ul className="dropdown-menu">
                <div className="search-filter d-flex align-items-center">
                  <i className="fa-solid fa-magnifying-glass px-2"></i>
                  <input type="text" className="me-2" />
                </div>
                <li>
                  <a className="dropdown-item" href="#">
                    array
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    dp
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    matrix
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <div className="hidetag">
              <button className="options">Hide tags</button>
            </div>
            <div className="random">
              <button className="options">
                <i
                  className="fa-solid fa-shuffle pe-2"
                  style={{ color: "#63E6BE" }}
                ></i>
                Pick random
              </button>
            </div>
          </div>
        </div>
        <div className="selected-tags py-2">selected tags here</div>
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
                      <div className="text-start">
                        <a
                          style={{ textDecoration: "none" }}
                          href={question.problemlink}
                          target="_blank"
                          rel="noreffrer"
                        >
                          {question.title}
                        </a>
                      </div>
                      <div className="taglist d-flex jutify-content-center align-items-center">
                        {question.problemTag?.map((tag, index) => (
                          <span key={index + 1} className="tags px-2">
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="mark-complete px-2">
                      <button className="btn-list">
                        <i
                          className="fa-solid fa-circle-check fa-lg"
                          style={{ color: "#63E6BE" }}
                        ></i>
                      </button>
                    </div>
                    <div className="mark-later px-2">
                      <button className="btn-list">
                        <i className="fa-solid fa-bookmark fa-lg"></i>
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
