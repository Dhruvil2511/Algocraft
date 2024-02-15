import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import axios from "axios";
import Loader from "../Content/Loader";
import Lottie from "lottie-react";
import notfound from "../../assets/animations/notfound.json";

import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
const Profile = ({ userId }) => {
  const [user, setUser] = useState({});
  const [threadList, setThreadList] = useState([]);
  const [questionList, setQuestionList] = useState([
    { title: "No Questions Yet" },
  ]);
  const [current, setCurrent] = useState("");
  const [owner, setOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);
  const fetchUser = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/get-user-profile", {
        params: {
          username: userId,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
          if (res.data.data.owner) {
            setOwner(true);
            getSavedQuestions();
          } else getSolvedQuestions();
        }
      })
      .catch((err) => {
        setUser({});
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
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);

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
  async function getCreatedThreads() {
    setIsListLoading(true);
    await axios
      .get(
        process.env.REACT_APP_BASE_URL + "/api/v1/users/get-created-threads",
        {
          params: {
            username: userId,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.threadsCreated.length === 0)
            setThreadList([{ title: "No Threads Yet" }]);
          else setThreadList(res.data.data.threadsCreated);
          setQuestionList([]);
          setCurrent("Threads created");
        }
      })
      .catch((err) => {
        console.error(err);
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
      })
      .finally(() => setIsListLoading(false));
  }
  async function getSavedThreads() {
    setIsListLoading(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/get-saved-threads", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.threadsSaved.length === 0)
            setThreadList([{ title: "No Threads Yet" }]);
          else setThreadList(res.data.data.threadsSaved);
          setQuestionList([]);
          setCurrent("Threads saved");
        }
      })
      .catch((err) => {
        console.error(err);
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
      })
      .finally(() => setIsListLoading(false));
  }
  async function getSavedQuestions() {
    // setIsListLoading(true);
    await axios
      .get(
        process.env.REACT_APP_BASE_URL + "/api/v1/users/get-saved-questions",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.length === 0)
            setQuestionList([{ title: "No Questions Yet" }]);
          else setQuestionList(res.data.data);
          setCurrent("Bookmarked Questions");
          setThreadList([]);
        }
      })
      .catch((err) => {
        console.error(err);
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
      })
      .finally(() => setIsListLoading(false));
  }
  async function getSolvedQuestions() {
    // setIsListLoading(true);
    await axios
      .get(
        process.env.REACT_APP_BASE_URL + "/api/v1/users/get-solved-questions",
        {
          params: {
            userId: userId,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.length === 0)
            setQuestionList([{ title: "No Questions Yet" }]);
          else setQuestionList(res.data.data);
          setCurrent("Solved Questions");
          setThreadList([]);
        }
      })
      .catch((err) => {
        console.error(err);
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
      })
      .finally(() => setIsListLoading(false));
  }
  const removeSavedQuestion = async (questionId) => {
    if (!questionId || questionId.trim() === "") return;

    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/sheets/save-question",
        { questionId: questionId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.message === "unsave") {
            getSavedQuestions();
          }
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
  const removeSolvedQuestion = async (questionId) => {
    if (!questionId || questionId.trim() === "") return;

    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/sheets/mark-question",
        { questionId: questionId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.message === "unsave") {
            getSolvedQuestions();
          }
        }
      })
      .catch((err) => console.error(err));
  };
  const removeSavedThread = async (threadId) => {
    if (!threadId || threadId.trim() === "") return;

    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/threads/unsave-thread",
        { threadId: threadId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.message === "unsave") {
            getSavedThreads();
          }
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
  const removeCreatedThread = async (threadId) => {
    await axios
      .delete(
        process.env.REACT_APP_BASE_URL + "/api/v1/threads/delete-thread",
        { params: { threadId: threadId }, withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          getCreatedThreads();
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

  return (
    <>
      {isLoading ? (
        <div className="p-4 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="content-header d-flex flex-column justify-content-center w-100 ">
          {user.username ? (
            <>
              <div className="profile-menu d-flex justify-content-between align-items-center w-100">
                <div className="daddy omg2 p-3 me-2 ">
                  <div className="d-flex justify-content-center align-items-center flex-column w-100">
                    <div className="profile m-2 d-flex justify-content-between align-items-center w-100">
                      <div className="streak  d-flex justify-content-center align-items-center">
                        <CircularProgress
                          sx={{ "--CircularProgress-size": "80px" }}
                          determinate
                          value={66.67}
                        >
                          2 / 3
                        </CircularProgress>
                        <div className="m-3">
                          <span className="text-underline">Streaks</span>
                        </div>
                      </div>
                      <div className="detail d-flex justify-content-center align-items-center">
                        <div className="naming flex-column d-flex justify-content-center align-items-center m-1">
                          {/* {console.log(user)} */}
                          <h6 className="text-end w-100">{user?.fullname}</h6>
                          <span className="text-end w-100 ">
                            @{user?.username}
                          </span>
                        </div>
                        <div className="rounded-square-pfp m-1">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt="Avatar"
                              style={{ width: "80px", height: "80px" }}
                            />
                          ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              {" "}
                              <div className="gola">
                                <i className="default-icon fa-solid fa-user fa-xl"></i>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="info w-100  m-2 mt-3 d-flex justify-content-around align-items center">
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <i className="fa-regular fa-star"></i>
                        <small>{user?.followers?.length}</small>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        <small>{user?.location}</small>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <a
                          href={user?.github}
                          className="text-decoration-none d-flex flex-column align-items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-github"></i>{" "}
                          <small>github </small>
                        </a>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <a
                          href={user?.linkedin}
                          className="text-decoration-none d-flex flex-column align-items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-linkedin"></i>{" "}
                          <small>linkedin</small>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="daddy omg p-3 ms-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="bars w-100">
                      <span>Easy</span>
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
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                      <span>Medium</span>
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
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <span>Hard</span>
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
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-start align-items-center w-100 daddy my-4">
                {owner ? (
                  <button
                    className="p-2 m-2"
                    style={{
                      background: "var(--itemColor)",
                      borderRadius: "8px",
                    }}
                    onClick={getSavedQuestions}
                  >
                    Bookmarked Questions
                  </button>
                ) : null}

                <button
                  className="p-2 m-2"
                  style={{
                    background: "var(--itemColor)",
                    borderRadius: "8px",
                  }}
                  onClick={getSolvedQuestions}
                >
                  Solved Questions
                </button>
                <button
                  className="p-2 m-2"
                  style={{
                    background: "var(--itemColor)",
                    borderRadius: "8px",
                  }}
                  // onClick={()=> setThreadList([])}
                >
                  Followed friends
                </button>
                <button
                  className="p-2 m-2"
                  onClick={getCreatedThreads}
                  style={{
                    background: "var(--itemColor)",
                    borderRadius: "8px",
                  }}
                >
                  Thread created
                </button>
                {owner ? (
                  <button
                    className="p-2 m-2"
                    style={{
                      background: "var(--itemColor)",
                      borderRadius: "8px",
                    }}
                    onClick={getSavedThreads}
                  >
                    Thread saved
                  </button>
                ) : null}
              </div>
              <div>{current}</div>
              <div className="daddy my-4 w-100 d-flex  align-items-center">
                <div
                  className="my-2 table-list w-100"
                  style={{ border: "none" }}
                >
                  {isListLoading ? (
                    <div className="p-4 d-flex justify-content-center align-items-center">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {threadList &&
                        threadList?.map((thread) => (
                          <div className="row p-2" key={thread?._id}>
                            <div className="question d-flex align-items-center justify-content-between">
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="number pfp">
                                  {thread?.avatar ? (
                                    <img src={thread.avatar} alt="Avatar" />
                                  ) : (
                                    <i className="fa-solid fa-user "></i>
                                  )}
                                </div>

                                <div className="title d-flex flex-column justify-content-center align-items-start">
                                  <Link
                                    to={`/discussion/${thread?.category}/${thread?._id}`}
                                    className="thread-title text-start"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {thread?.title}
                                  </Link>
                                  <div className="dis-taglist d-flex justify-content-center align-items-center">
                                    <Link
                                      to={`${thread?.uploader?.username}`}
                                      className="username"
                                    >
                                      {thread?.uploader?.username}
                                    </Link>
                                    {thread?.tags?.map((tag, index) => (
                                      <span key={index} className="tags px-2">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {thread?.uploader && (
                                <div className="d-flex justify-content-center align-items-center">
                                  <div className="mark-complete px-2">
                                    <i className="fa-regular fa-circle-up "></i>
                                    <small className="px-2">
                                      {thread?.upvotes?.length}
                                    </small>
                                  </div>
                                  <div className="mark-later px-2">
                                    <i className="fa-regular fa-eye "></i>
                                    <small className="px-2">
                                      {thread?.views?.length}
                                    </small>
                                  </div>
                                  <div className="mark-later px-2">
                                    {owner && (
                                      <>
                                        {current === "Threads saved" ? (
                                          <button
                                            className="btn-list"
                                            onClick={() =>
                                              removeSavedThread(thread?._id)
                                            }
                                          >
                                            <i className="fa-solid fa-xmark"></i>{" "}
                                          </button>
                                        ) : (
                                          <button
                                            className="btn-list"
                                            onClick={() =>
                                              removeCreatedThread(thread?._id)
                                            }
                                          >
                                            <i
                                              className="fa-solid fa-trash-can"
                                              style={{ color: "red" }}
                                            ></i>
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      {questionList &&
                        questionList?.map((question, index) => (
                          <div className="row w-100 p-2 " key={index + 1}>
                            <div className="question  d-flex align-items-center justify-content-between ">
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="number">{index + 1}</div>
                                {/* <div className="status"></div> */}
                                <div className="title d-flex flex-column justify-content-center align-items-start">
                                  <div className="text-start d-flex justify-content-center align-items-center">
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={question?.problemlink}
                                      target="_blank"
                                      rel="noreffrer"
                                    >
                                      {question.title}
                                    </Link>
                                    {question?.difficulty && (
                                      <span
                                        className="ms-3 fs-6"
                                        style={{
                                          color: getColor(question?.difficulty),
                                        }}
                                      >
                                        ({question?.difficulty})
                                      </span>
                                    )}
                                  </div>
                                  <div className="taglist d-flex jutify-content-center align-items-center flex-wrap">
                                    {question?.problemTags?.map(
                                      (tag, index) => (
                                        <span
                                          key={index + 1}
                                          className="tags px-2"
                                        >
                                          {tag}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="mark-complete px-2">
                                  {owner && (
                                    <>
                                      {current === "Solved Questions" ? (
                                        <button
                                          className="btn-list"
                                          onClick={() =>
                                            removeSolvedQuestion(question?._id)
                                          }
                                        >
                                          <i className="fa-solid fa-xmark"></i>
                                        </button>
                                      ) : (
                                        <button
                                          className="btn-list"
                                          onClick={() =>
                                            removeSavedQuestion(question?._id)
                                          }
                                        >
                                          <i className="fa-solid fa-xmark"></i>
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                                {question?.username && (
                                  <div className="solution px-2">
                                    <Link href="#" className="btn-list">
                                      <i
                                        className="fa-brands fa-youtube fa-lg"
                                        style={{ color: "#ff0000" }}
                                      ></i>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="container d-flex justify-content-center align-items-center">
              <Lottie
                animationData={notfound}
                loop={true}
                style={{ width: "80%" }}
              ></Lottie>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
