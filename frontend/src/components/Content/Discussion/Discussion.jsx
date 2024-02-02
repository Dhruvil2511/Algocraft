import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Discussion = () => {
  const location = useLocation();
  const [path, setPath] = useState(window.location.pathname);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "interview-experience",
    content: "",
    tags: [],
  });
  const [threadList, setThreadList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataAvail, setIsDataAvail] = useState(true);
  const [typedTag, setTag] = useState("");
  const [tagList, setTags] = useState(new Set());

  const perPage = 10;
  const fetchThreadList = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const category = queryParams.get("category");
    setPath(path + category);

    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/threads/get-thread-list", {
        params: {
          category: category,
          page: currentPage,
          limit: perPage,
          search: searchText,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data?.length === 0) {
            setIsDataAvail(false);
            setThreadList([]);
          } else {
            setIsDataAvail(true);
            setThreadList(response.data.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchThreadList();
    return () => {};
  }, [location.search, currentPage]);

  function handleSearchSubmit(event) {
    if (searchText.length < 3) alert("Search more than 3 char...");
    else fetchThreadList();
  }

  function getPrevPage(event) {
    if (currentPage <= 1) return;

    setCurrentPage(currentPage - 1);
  }
  function getNextPage() {
    if (!isDataAvail) return;
    setCurrentPage(currentPage + 1);
  }

  function handleAddTag(event) {
    event.preventDefault();

    if (tagList.length >= 3) {
      alert("Max 3 tags only");
      return;
    }

    if (typedTag.trim() !== "") {
      const tagSetter = new Set(tagList);
      tagSetter.add(typedTag.trim());
      setTags(tagSetter);
      setTag("");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormData({ ...formData, tags: tagList });

    await axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/v1/threads/create-thread",
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Response:\n" + response.status);
        if (response.status === 200) {
          let threadDetail = response.data.data;
          window.location.href = `/discussion/${threadDetail.category}/${threadDetail._id}`;
        }
      })
      .catch((error) => {
        console.error("Error posting data to server");
      });
  }
  return (
    <div className="content-header">
      <div
        className="create-thread m-2 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#00D0DB",
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <button
          className="bg-transparent"
          style={{ border: "none" }}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <i className="fa-solid fa-pen-nib fa-xl"></i>
        </button>
      </div>
      <div
        className="offcanvas offcanvas-bottom h-50"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        style={{ backgroundColor: "var(--itemColor)" }}
      >
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit} method="post">
            <div className="d-flex justify-content-center align-items center flex-column">
              <div className="title-post d-flex justify-content-between align-items-center">
                <div
                  className="title-inp d-flex justify-content-start align-items center"
                  style={{ width: "60%" }}
                >
                  <input
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your title here..."
                    style={{
                      width: "40%",
                      borderRadius: "4px",
                      color: "var(--mainTextColor)",
                      backgroundColor: "var(--secondaryColor)",
                    }}
                  />
                  <select
                    required
                    className="options"
                    style={{
                      margin: "0 0 0 15px",
                      color: "var(--mainTextColor)",
                    }}
                    name="category"
                    value={formData?.category || "Interview Experience"}
                    onChange={handleChange}
                  >
                    <option value="interview-experience">
                      Interview Experience
                    </option>
                    <option value="algorithms">Algorithms</option>
                    <option value="development">Development</option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </select>
                </div>
                <div
                  className="d-flex justify-content-around align-items-center"
                  style={{ width: "15%" }}
                >
                  <div className="cancel">
                    <button
                      type="button"
                      className="btn-close text-reset d-flex justify-content-center align-items-center"
                      data-bs-dismiss="offcanvas"
                    >
                      <span className="text-danger"> Cancel</span>
                    </button>
                  </div>
                  <div className="submit">
                    <button
                      className="grad-btn"
                      style={{
                        overflow: "hidden",
                        borderRadius: "16px",
                        padding: "10px",
                      }}
                      type="submit"
                    >
                      <i className="fa-solid fa-paper-plane fa-lg"></i>Post
                      <div className="hoverEffect">
                        <div></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" mt-3 thred-tag d-flex justify-content-start w-50">
                <input
                  type="text"
                  placeholder="Enter tags here.."
                  name="tags"
                  value={typedTag}
                  onChange={(event) => setTag(event.target.value)}
                  style={{
                    width: "40%",
                    borderRadius: "4px",
                    color: "var(--mainTextColor)",
                    backgroundColor: "var(--secondaryColor)",
                  }}
                />
                <button
                  style={{
                    margin: "0 0 0 15px",
                    padding: "5px",
                    minWidth: "fit-content",
                  }}
                  className="options"
                  onClick={handleAddTag}
                >
                  Add
                </button>
                {[...tagList].map((tagText) => {
                  console.log(tagText);
                  return (
                    <span
                      key={tagText} // Make sure to add a unique key prop when rendering lists
                      className="mx-2 p-1"
                      style={{
                        borderRadius: "4px",
                        border: "1px dotted black",
                        width: "fit-content",
                      }}
                    >
                      {tagText}
                    </span>
                  );
                })}
              </div>

              <div className="mt-3 thread-content">
                <textarea
                  required
                  id="content"
                  cols="150"
                  rows="10"
                  placeholder="Enter your content here.. "
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>

      <h1>Discussion </h1>
      <p>
        Dive into collaborative learning at Coding Discussions, Algocraft's
        vibrant online community. Connect with fellow programmers, seek help,
        and share knowledge. Our discussion section complements your coding
        journey, offering support and guidance. Elevate your skills together.
        Happy coding
      </p>
      <div className="daddy discussion-fliter d-flex align-items-center justify-content-between ">
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <a
            className={
              path.includes("all")
                ? "text-links ms-2 fs-3 active"
                : "text-links ms-2 fs-3"
            }
            href="/discussion?category=all"
          >
            All topics
          </a>

          <a
            className={
              path.includes("interview-experience")
                ? "text-links ms-2 fs-6 active"
                : "text-links ms-2 fs-6"
            }
            href="/discussion?category=interview-experience"
          >
            Interview Experience
          </a>

          <a
            className={
              path.includes("algorithms")
                ? "text-links ms-2 fs-6 active"
                : "text-links ms-2 fs-6"
            }
            href="/discussion?category=algorithms"
          >
            Algorithms
          </a>

          <a
            className={
              path.includes("development")
                ? "text-links ms-2 fs-6 active"
                : "text-links ms-2 fs-6"
            }
            href="/discussion?category=development"
          >
            Development
          </a>

          <a
            className={
              path.includes("miscellaneous")
                ? "text-links ms-2 fs-6 active"
                : "text-links ms-2 fs-6"
            }
            href="/discussion?category=miscellaneous"
          >
            Miscellaneous
          </a>
        </div>
        <div className="searchBox me-3">
          <input
            className="searchInput"
            type="text"
            name="search"
            required
            placeholder="Search title .."
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button onClick={handleSearchSubmit} className="searchButton">
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          </button>
        </div>
      </div>
      <div className="daddy my-4 w-100 d-flex  align-items-center">
        <div className="my-2 table-list w-100" style={{ border: "none" }}>
          {!isDataAvail ? (
            <div className="p-5 d-flex justify-content-center align-items-center flex-column">
              <i className="p-3 fa-solid fa-ban fa-2xl text-danger"></i>
              <span className="fs-4">That's it for now!</span>
            </div>
          ) : null}
          {threadList.map((thread) => (
            <div className="row p-2" key={thread._id}>
              <div className="question d-flex align-items-center justify-content-between">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="number pfp">
                    {thread.uploader.avatar ? (
                      <img src={thread.uploader.avatar} alt="Avatar" />
                    ) : (
                      <i className="fa-solid fa-user "></i>
                    )}
                  </div>

                  <div className="title d-flex flex-column justify-content-center align-items-start">
                    <a
                      href={`/discussion/${thread.category}/${thread._id}`}
                      className="thread-title text-start"
                    >
                      {thread.title}
                    </a>
                    <div className="dis-taglist d-flex justify-content-center align-items-center">
                      <a href="#" className="username">
                        {thread.uploader.username}
                      </a>
                      {thread.tags.map((tag, index) => (
                        <span key={index} className="tags px-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="mark-complete px-2">
                    <i className="fa-regular fa-circle-up "></i>
                    <small className="px-2">{thread.upvotes?.length}</small>
                  </div>
                  <div className="mark-later px-2">
                    <i className="fa-regular fa-eye "></i>
                    <small className="px-2">{thread.views?.length}</small>
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
  );
};

export default Discussion;
