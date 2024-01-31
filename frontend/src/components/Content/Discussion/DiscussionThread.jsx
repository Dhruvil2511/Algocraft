import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DiscussionThread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState({});

  useEffect(() => {
    const fetchThread = async () => {
      await axios
        .get(process.env.REACT_APP_BASE_URL + `/api/v1/threads/get-thread`, {
          params: { threadId: id },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            setThread(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data from db");
        });
    };
    fetchThread();
    return () => {};
  }, []);
  return (
    <>
      <div className="content-header">
        <div className="thread d-flex flex-column justify-content-start align-items-center">
          <div className="thread-header w-100 p-2 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <a
                href={`/discussion?category=${thread.category}`}
                className="p-2"
                style={{ borderRight: "2px solid gray" }}
              >
                <i className="fa-solid fa-left-long fa-xl"></i>
              </a>
              <strong className="px-2">{thread.title}</strong>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <a href="" className="px-2">
                <i className="fa-solid fa-share-from-square fa-lg"></i>
              </a>
              <a href="" className="px-2">
                <i className="fa-solid fa-flag fa-lg"></i>
              </a>
            </div>
          </div>
          <div className="thread-content p-5">
            <div className="author d-flex justify-content-start align-items-center">
              <div className="number pfp">
                {thread.avatar ? (
                  <img src={thread.avatar} alt="Avatar" />
                ) : (
                  <i className="fa-solid fa-user "></i>
                )}
              </div>
              <div className="px-2">
                <strong> {thread.uploader?.username}</strong>
              </div>
              <div className="time">
                <sub>{new Date(thread.createdAt).toLocaleString()}</sub>
              </div>
            </div>
            <div className="thread-mainc pre-container py-3">
              {thread.content}
            </div>
            <div className="thread-interaction w-100">
              <div className="py-2 d-flex justify-content-start align-item-center">
                <div className="mark-complete">
                  <a href="#">
                    <i className="fa-regular fa-circle-up "></i>
                  </a>
                  <small className="px-2">{thread.upvotes} upvotes</small>
                </div>
                <div className="mark-complete">
                  <a href="#">
                    <i className="fa-regular fa-circle-up "></i>
                  </a>
                  <small className="px-2">{thread.upvotes} up</small>
                </div>
                <div className="mark-later px-4">
                  <i className="fa-regular fa-eye "></i>
                  <small className="px-2">{thread.views} views</small>
                </div>
              </div>
            </div>
            <div className="thread-comments py-3">
              <span>Comments</span>
              <form action="#" method="post" className="comment-form">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="w-100 p-1"
                    placeholder="Your comment here"
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
            <div className="comments w-100 py-2">
              <div className="comment d-flex justify-content-start align-items-center">
                <div className="d-flex flex-column justify-content-start align-items-center">
                  <div className="d-flex w-100 justify-content-start align-items-center">
                    <div
                      className="number pfp"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                    </div>
                    <div className="px-2">
                      <small>kalash shah</small>
                    </div>
                    <div className="time">
                      <sub>12/12/12 1.30pm</sub>
                    </div>
                  </div>
                  <div className="comment-text p-2">
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      At tempora, repellat nisi repellendus odio assumenda cum
                      aut maxime. Quas, impedit!
                    </span>
                  </div>
                  <div className="comment-interaction d-flex justify-content-start align-items-center w-100 px-2">
                    <div className="view-replies">
                      <sub>
                        <button className="btn-list">
                          <i className="fa-solid fa-message"></i> View replies
                        </button>
                      </sub>
                    </div>
                    <div className="reply">
                      <sub>
                        <button className="btn-list">
                          <i className="fa-solid fa-reply"></i> Reply
                        </button>
                      </sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div > */}
    </>
  );
};

export default DiscussionThread;
