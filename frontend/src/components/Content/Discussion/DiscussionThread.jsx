import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader.jsx";
import { Bounce, toast } from "react-toastify";

const DiscussionThread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [upvotes, setUpvotes] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiked, setLiked] = useState(false);
  const [isRepliedClicked, setRepliedClicked] = useState(false);
  const [isViewRepliedClicked, setViewRepliedClicked] = useState(false);
  const [viewReplyCommentId, setViewReplyCommentId] = useState("");

  const [userReply, setUserReply] = useState("");
  const [userComment, setUserComment] = useState("");
  const [threadComments, setThreadComments] = useState([]);
  const [commentReplies, setCommentReplies] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [isThreadSaved, setIsThreadSaved] = useState(false);
  const commentInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [repliesLoading, setRepliesLoading] = useState(false);

  const fetchThread = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/api/v1/threads/get-thread`, {
        params: { threadId: id },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setThread(data.thread);
          setUpvotes(data.thread.upvotes?.length);
          setViews(data.thread.views?.length);
          setThreadComments(data.thread.comments);

          if (data.upvotedOrNot) setLiked(true);
          else setLiked(false);

          if (data.savedOrNot) setIsThreadSaved(true);
          else setIsThreadSaved(false);
        }
      })
      .catch((error) => {
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
        // console.error("Error fetching data from db");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchThread();
    return () => {};
  }, []);

  async function handleUpvote(event) {
    if (isLiked === false) {
      setLiked(true);
      setUpvotes(upvotes + 1);
    } else {
      setLiked(false);
      setUpvotes(upvotes - 1);
    }
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/api/v1/threads/upvote-thread`, {
        params: { threadId: id },
        withCredentials: true,
      })
      .then((res) => {})
      .catch((err) => {
        toast("Error upvoting thread", {
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
        console.log(err);
      });
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    if (userComment.trim() === "") return;

    await axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/v1/threads/upload-comment",
        { content: userComment },
        {
          params: {
            threadId: id,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserComment("");
          // console.log(res.data.data);
          fetchThread();
        }
      })
      .catch((err) => {
        toast("Error posting comment", {
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
  }

  async function handleReplySubmit(event) {
    event.preventDefault();

    if (userReply.trim() === "") return;

    await axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/v1/threads/upload-reply",
        { repliedContent: userReply },
        {
          params: {
            commentId: commentId,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setRepliedClicked(false);
          setUserReply("");
          fetchThread();
        }
      })
      .catch((err) => {
        toast("Error posting reply", {
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
  }

  async function handleReplyButton(value, id) {
    setRepliedClicked(!isRepliedClicked);
    setCommentId(id);
    // setUserReply(`@${value} `);
  }

  async function handleViewReplyButton(id) {
    setViewRepliedClicked(!isViewRepliedClicked);
    setViewReplyCommentId(id);
    setRepliesLoading(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/threads/get-replies", {
        params: {
          comment_id: id,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.data.replies);
          setCommentReplies(res.data.data?.replies);
        }
      })
      .catch((err) => {
        toast("Error while replying", {
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
      .finally(() => setRepliesLoading(false));
  }

  async function handleBookmarkThread(threadId) {
    setIsThreadSaved(!isThreadSaved);
    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/threads/save-thread",
        { threadId: threadId },
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((err) => {
        console.error(err);
        toast("Error saving thread", {
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
  }

  function handleShare() {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast("Link copied to clipboard", {
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
      .catch((error) => {
        toast("Failed to copy URL to clipboard", {
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
  }
  return (
    <>
      <div className="content-header">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          <div className="thread d-flex flex-column justify-content-start align-items-center">
            <div className="thread-header w-100 p-2 d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-start align-items-center">
                <Link
                  to={`/discussion?category=${thread?.category}`}
                  className="p-2"
                  style={{ borderRight: "2px solid gray" }}
                >
                  <i className="fa-solid fa-left-long fa-xl"></i>
                </Link>
                <strong
                  className="px-2"
                  style={{
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "250px",
                  }}
                >
                  {thread?.title}
                </strong>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <button className="btn-list px-2" onClick={handleShare}>
                  <i className="fa-solid fa-share-from-square fa-lg"></i>
                </button>
                <Link href="#" className="px-2">
                  <i className="fa-solid fa-flag fa-lg"></i>
                </Link>
              </div>
            </div>
            <div className="thread-content p-5 w-100">
              <div className="baap d-flex justify-content-around align-items-center">
                <div className="author w-100 d-flex justify-content-start align-items-center">
                  <div
                    className="number pfp"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Link to={`/${thread?.uploader?.username}`}>
                      {thread?.uploader?.avatar ? (
                        <img src={thread?.uploader?.avatar} alt="Avatar" />
                      ) : (
                        <i className="fa-solid fa-user "></i>
                      )}
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <h6 className="px-2 d-flex justify-content-start align-items-center">
                      {thread?.uploader?.fullname}
                    </h6>
                    <div className="w-100 px-2 d-flex justify-content-start  align-items-center">
                      <Link
                        to={`/${thread?.uploader?.username}`}
                        className="text-decoration-none"
                      >
                        <strong className="w-100">
                          @{thread?.uploader?.username}
                        </strong>
                      </Link>
                    </div>
                  </div>

                  <div className="time">
                    <sub>{new Date(thread.createdAt).toLocaleString()}</sub>
                  </div>
                </div>
                <div className="save  ">
                  <button
                    title="Bookmark"
                    className="d-flex justify-content-center align-items-center"
                    onClick={() => handleBookmarkThread(thread._id)}
                    style={{ background: "none", border: "none" }}
                  >
                    {isThreadSaved ? (
                      <i className="fa-solid fa-bookmark fa-xl"></i>
                    ) : (
                      <i className="fa-regular fa-bookmark fa-xl"></i>
                    )}{" "}
                    <small className="px-2">Save</small>
                  </button>
                </div>
              </div>

              <div className="thread-mainc pre-container py-3">
                {thread.content}
              </div>
              <div className="thread-interaction w-100">
                <div className="py-2 d-flex justify-content-start align-item-center">
                  <div className="mark-complete">
                    <button
                      onClick={handleUpvote}
                      style={{ border: "none", background: "transparent" }}
                    >
                      {isLiked ? (
                        <i className="fa-solid fa-circle-up fa-lg"></i>
                      ) : (
                        <i className="fa-regular fa-circle-up fa-lg"></i>
                      )}
                    </button>
                    <small className="px-2">{upvotes} upvotes</small>
                  </div>
                  <div className="mark-later px-4">
                    <i className="fa-regular fa-eye "></i>
                    <small className="px-2">{views} views</small>
                  </div>
                </div>
              </div>
              <div className="thread-comments py-3">
                <span>Comments</span>
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <div className="d-flex align-items-center">
                    <input
                      value={userComment}
                      type="text"
                      className="w-100 p-1"
                      placeholder="Your comment here"
                      onChange={(event) => setUserComment(event.target.value)}
                      style={{
                        backgroundColor: "var(--secondaryColor)",
                        color: "var(--textColor)",
                        borderRadius: "8px 0px 0px 8px",
                      }}
                    />
                    <button type="submit" className="btn2">
                      {" "}
                      <div className="hoverEffect">
                        <div></div>
                      </div>
                      Post
                    </button>
                  </div>
                </form>
              </div>
              <div className="comments w-100 py-3">
                {threadComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="comment d-flex py-2 justify-content-start align-items-center w-100"
                  >
                    <div className="d-flex flex-column justify-content-start align-items-center">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <div
                          className="number pfp"
                          style={{ width: "40px", height: "40px" }}
                        >
                          <Link to={`/${comment?.commentBy?.username}`}>
                            {comment.commentBy?.avatar ? (
                              <img
                                src={comment.commentBy.avatar}
                                alt="Avatar"
                              />
                            ) : (
                              <i className="fa-solid fa-user "></i>
                            )}
                          </Link>
                        </div>
                        <div className="px-2">
                          {comment.commentBy?.username ? (
                            <Link
                              to={`/${comment?.commentBy?.username}`}
                              className="text-decoration-none"
                            >
                              <small>@{comment.commentBy?.username}</small>
                            </Link>
                          ) : (
                            <small>@deleted_user</small>
                          )}
                        </div>
                        <div className="time">
                          <sub>
                            {new Date(comment.createdAt).toLocaleString()}
                          </sub>
                        </div>
                      </div>
                      <div className="comment-text w-100 ps-5 d-flex justify-content-start flex-column align-items-center">
                        <span className="text-start w-100">
                          {comment.content}
                        </span>
                        <div className="comment-interaction d-flex justify-content-start align-items-center w-100">
                          {comment.replies.length !== 0 ? (
                            <div className="view-replies">
                              <sub>
                                <button
                                  className="btn-list"
                                  onClick={() =>
                                    handleViewReplyButton(comment._id)
                                  }
                                >
                                  <i className="fa-solid fa-message"></i> View
                                  replies
                                </button>
                              </sub>
                            </div>
                          ) : null}
                          <div className="reply">
                            <sub>
                              <button
                                className="btn-list"
                                onClick={() =>
                                  handleReplyButton(
                                    comment.commentBy?.username,
                                    comment._id
                                  )
                                }
                              >
                                <i className="fa-solid fa-reply"></i> Reply
                              </button>
                            </sub>
                          </div>
                        </div>
                        {isViewRepliedClicked &&
                          viewReplyCommentId === comment._id &&
                          commentReplies?.map((reply) => (
                            <div
                              key={reply._id}
                              className="comment d-flex py-2 justify-content-start align-items-center w-100"
                            >
                              <div className="d-flex flex-column justify-content-start align-items-center">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                  <div
                                    className="number pfp"
                                    style={{ width: "40px", height: "40px" }}
                                  >
                                    <Link to={`/${reply?.repliedBy?.username}`}>
                                      {reply?.repliedBy?.avatar ? (
                                        <img
                                          src={reply.repliedBy.avatar}
                                          alt="Avatar"
                                        />
                                      ) : (
                                        <i className="fa-solid fa-user "></i>
                                      )}
                                    </Link>
                                  </div>
                                  <div className="px-2">
                                    {reply.repliedBy?.username ? (
                                      <Link
                                        to={`/${reply.repliedBy?.username}`}
                                        className="text-decoration-none"
                                      >
                                        <small>
                                          @{reply.repliedBy?.username}
                                        </small>
                                      </Link>
                                    ) : (
                                      <small>@deleted_user</small>
                                    )}
                                  </div>
                                  <div className="time">
                                    <sub>
                                      {new Date(
                                        reply.createdAt
                                      ).toLocaleString()}
                                    </sub>
                                  </div>
                                </div>
                                <div className="comment-replies w-100 ps-2 d-flex justify-content-start flex-column align-items-center">
                                  <span className="text-start ps-2 w-100">
                                    {reply.repliedContent}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {isRepliedClicked && commentId === comment._id && (
                        <div className="ps-5">
                          <form
                            onSubmit={handleReplySubmit}
                            className="comment-form"
                          >
                            <div className="d-flex align-items-center">
                              <input
                                ref={commentInputRef}
                                value={userReply}
                                type="text"
                                className="w-100 p-1"
                                placeholder="Your comment here"
                                onChange={(event) =>
                                  setUserReply(event.target.value)
                                }
                                style={{
                                  backgroundColor: "var(--secondaryColor)",
                                  color: "var(--textColor)",
                                  borderRadius: "8px 0px 0px 8px",
                                }}
                              />
                              <button type="submit" className="btn2">
                                {" "}
                                <div className="hoverEffect">
                                  <div></div>
                                </div>
                                Post
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* </div > */}
    </>
  );
};

export default DiscussionThread;
