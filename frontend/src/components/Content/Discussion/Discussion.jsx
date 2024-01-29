import React, { useEffect, useState } from "react";

const Discussion = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: [],
  });

  const [typedTag, setTag] = useState("");
  const [tagList, setTags] = useState([]);

  useEffect(() => {
    console.log(tagList);
  }, [tagList]);

  useEffect(() => {
    console.log(formData.tags); // This will log the updated formData whenever it changes
  }, [formData.tags]);

  function handleAddTag(event) {
    event.preventDefault();
    if (typedTag.trim() !== "") {
      setTags([...tagList, typedTag.trim()]);
      setTag("");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormData({ ...formData, tags: tagList });
    console.log(formData);
    alert(" You clicked submit.");
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
                    <option value="Interview Experience">
                      Interview Experience
                    </option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Development">Development</option>
                    <option value="Miscellaneous">Miscellaneous</option>
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
              </div>

              <div className="mt-3 thread-content">
                <textarea
                  required
                  id="content"
                  cols="100"
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
          <a className="text-links m-2 fs-3 active" href="#">
            All topics
          </a>
          <a className="text-links m-2 fs-6" href="#">
            Interview Experience
          </a>
          <a className="text-links m-2 fs-6" href="#">
            Algorithms
          </a>
          <a className="text-links m-2 fs-6" href="#">
            Development
          </a>
          <a className="text-links m-2 fs-6" href="#">
            Miscellaneous
          </a>
        </div>
        <div className="searchBox me-3">
          <input
            className="searchInput"
            type="text"
            name=""
            required
            placeholder="Search.."
          />
          <button className="searchButton" href="#">
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          </button>
        </div>
      </div>
      <div className="daddy my-4 w-100 d-flex  align-items-center">
        <div className="my-2 table-list w-100" style={{ border: "none" }}>
          <div className="row p-2 ">
            <div className="question  d-flex align-items-center justify-content-between ">
              <div className="d-flex justify-content-center align-items-center">
                <div className="number pfp">
                  <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                </div>

                {/* <div className="status"></div> */}
                <div className="title d-flex flex-column justify-content-center align-items-start">
                  <a
                    href="/discussion/interview/123"
                    className="thread-title text-start"
                  >
                    My interview experience at Google
                  </a>
                  <div className="dis-taglist d-flex jutify-content-center align-items-center">
                    <a href="#" className="username">
                      kadash_shah
                    </a>
                    <span className="tags px-2">interview</span>
                    <span className="tags px-2">google</span>
                    <span className="tags px-2">dsa</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mark-complete px-2">
                  <i className="fa-regular fa-circle-up fa-lg"></i>
                  <small className="px-2">12</small>
                </div>
                <div className="mark-later px-2">
                  <i className="fa-regular fa-eye fa-lg"></i>
                  <small className="px-2">12k</small>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-2 ">
            <div className="question  d-flex align-items-center justify-content-between ">
              <div className="d-flex justify-content-center align-items-center">
                <div className="number pfp">
                  <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                </div>

                {/* <div className="status"></div> */}
                <div className="title d-flex flex-column justify-content-center align-items-start">
                  <a href="#" className="thread-title text-start">
                    My interview experience at Google
                  </a>
                  <div className="dis-taglist  d-flex jutify-content-center align-items-center">
                    <a href="#" className="username">
                      kadash_shah
                    </a>
                    <span className="tags px-2">interview</span>
                    <span className="tags px-2">google</span>
                    <span className="tags px-2">dsa</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mark-complete px-2">
                  <i className="fa-regular fa-circle-up fa-lg"></i>
                  <small className="px-2">12</small>
                </div>
                <div className="mark-later px-2">
                  <i className="fa-regular fa-eye fa-lg"></i>
                  <small className="px-2">12k</small>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-2 ">
            <div className="question  d-flex align-items-center justify-content-between ">
              <div className="d-flex justify-content-center align-items-center">
                <div className="number pfp">
                  <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                </div>

                {/* <div className="status"></div> */}
                <div className="title d-flex flex-column justify-content-center align-items-start">
                  <a href="#" className="thread-title text-start">
                    My interview experience at Google
                  </a>
                  <div className="dis-taglist  d-flex jutify-content-center align-items-center">
                    <a href="#" className="username">
                      kadash_shah
                    </a>
                    <span className="tags px-2">interview</span>
                    <span className="tags px-2">google</span>
                    <span className="tags px-2">dsa</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mark-complete px-2">
                  <i className="fa-regular fa-circle-up fa-lg"></i>
                  <small className="px-2">12</small>
                </div>
                <div className="mark-later px-2">
                  <i className="fa-regular fa-eye fa-lg"></i>
                  <small className="px-2">12k</small>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-2 ">
            <div className="question  d-flex align-items-center justify-content-between ">
              <div className="d-flex justify-content-center align-items-center">
                <div className="number pfp">
                  <img src="https://i.imgur.com/Qu8Vjw5.png" alt="X" />
                </div>

                {/* <div className="status"></div> */}
                <div className="title d-flex flex-column justify-content-center align-items-start">
                  <a
                    href="/discussion/interview/123"
                    className="thread-title text-start"
                  >
                    My interview experience at Google
                  </a>
                  <div className="dis-taglist d-flex jutify-content-center align-items-center">
                    <a href="#" className="username">
                      kadash_shah
                    </a>
                    <span className="tags px-2">interview</span>
                    <span className="tags px-2">google</span>
                    <span className="tags px-2">dsa</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mark-complete px-2">
                  <i className="fa-regular fa-circle-up fa-lg"></i>
                  <small className="px-2">12</small>
                </div>
                <div className="mark-later px-2">
                  <i className="fa-regular fa-eye fa-lg"></i>
                  <small className="px-2">12k</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
