import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import Loader from "./Loader";
const CodingResources = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataAvail, setIsDataAvail] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("");
  const perPage = 9;

  function getPrevPage(event) {
    if (currentPage <= 1) return;

    setCurrentPage(currentPage - 1);
  }
  function getNextPage() {
    if (!isDataAvail) return;
    setCurrentPage(currentPage + 1);
  }

  async function handleResourceSearch(event) {
    event?.preventDefault();
    setIsLoading(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/api/v1/resources/get-resources", {
        params: {
          search: query,
          page: currentPage,
          limit: perPage,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setResources(res.data.data);
          setIsDataAvail(true);
        }
      })
      .catch((err) => {
        const { userMessage } = err?.response?.data;
        setIsDataAvail(false);
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
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    handleResourceSearch();
  }, [currentPage,handleResourceSearch]);
  return (
    <div className="content-header">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Coding Resources</h1>
          <p>
            Unlock a treasure trove of knowledge with Algocraft's "Coding
            Resources" – your ultimate destination for a diverse array of coding
            materials. This feature caters to your learning needs by
            consolidating valuable resources from various platforms, offering a
            seamless and comprehensive learning experience.
          </p>
          <form onSubmit={handleResourceSearch} className="w-100">
            <div className="searchBox">
              <input
                className="searchInput"
                type="text"
                name="search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search something..."
              />
              <button className="searchButton" type="submit">
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
              </button>
            </div>
          </form>
          <div className="mt-3 row row-cols-1 row-cols-md-3 g-4">
            {resources?.map((resource, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <img src={resource.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ color: "var(--mainTextColor)" }}
                    >
                      {resource.title}
                    </h5>
                    <small
                      className="card-text"
                      style={{ color: "var(--mainTextColor)" }}
                    >
                      {resource.description}
                    </small>
                  </div>
                  <div className="card-footer">
                    <Link
                      to={resource.link}
                      className="text-decoration-none"
                      target="_blank"
                    >
                      Link
                      <i className="ms-2 fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pagination d-flex justify-content-evenly h-10 align-items-center">
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
              {/* <input type="text" style={{width:"20px"}} /> {190/perPage} */}
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
        </>
      )}
    </div>
  );
};

export default CodingResources;
