import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import codingAnimation from "../../assets/animations/home.json";
import ballAnimation from "../../assets/animations/ball-animation.json";
import "./Landing.css";
import Typewriter from "typewriter-effect";
import { Fade } from "react-reveal";
import { Navigation } from "./Navigation";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) setUser(res.data.data.user);
      } catch (err) {
        console.error("User not logged in");
      }
    };
    fetchCurrentUser();
  }, []);

  async function handleNewsletterSubmit(event) {
    if (email.trim() === "") return;
    event.preventDefault();

    await axios
      .post(process.env.REACT_APP_BASE_URL + "/api/v1/newsletter/add-user", {
        email: email,
      })
      .then((res) => {
        // add toastify
        if (res.status === 200) alert("email subbed");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast("Email already subbed", {
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
        }
      });
    setEmail("");
  }
  return (
    <>
      <Navigation user={user} />
      <div className="page1 h-100">
        <div className="container-fluid d-flex justify-content-center align-items-center ">
          <div className="mc container my-4 d-flex justify-content-between align-items-center ">
            <div className="right  mx-3 d-flex justify-content-center align-items-center ">
              <div className=" d-flex justify-content-center align-items-center flex-column">
                <h1 className="mt-2 drop-in" style={{ overflow: "hidden" }}>
                  Empowering Engineers, Mastering Interviews, Crafting Futures.{" "}
                </h1>

                <h3 className="mt-4 drop-in-2" style={{ overflow: "hidden" }}>
                  <Typewriter
                    options={{
                      strings: ["Track", "Learn", "Discuss", "Crack"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h3>

                <span
                  className="fs-4 my-4 drop-in-3"
                  style={{ overflow: "hidden" }}
                >
                  An ultimate platform to help you crack your Software
                  engineering interview.
                </span>
                {user ? (
                  <form action="/coding-sheets/striver">
                    <button
                      className="grad-btn mt-2 drop-in-4"
                      style={{ overflow: "hidden" }}
                    >
                      Lets Crack it
                      <div className="hoverEffect">
                        <div></div>
                      </div>
                    </button>
                  </form>
                ) : (
                  <form action="/login">
                    <button
                      className="grad-btn mt-2 drop-in-4"
                      style={{ overflow: "hidden" }}
                    >
                      Lets Crack it
                      <div className="hoverEffect">
                        <div></div>
                      </div>
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className="background-animation">
              <Lottie
                animationData={ballAnimation}
                loop={true}
                style={{ width: "100%" }}
              ></Lottie>
            </div>
            <div className="left">
              <Lottie
                animationData={codingAnimation}
                loop={true}
                style={{ width: "100%" }}
              ></Lottie>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll py-3">
        <svg
          width="30px"
          height="100%"
          viewBox="0 0 247 390"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 1.5,
          }}
        >
          <path
            id="wheel"
            d="M123.359,79.775l0,72.843"
            style={{ fill: "none", strokeWidth: "20px" }}
          />
          <path
            id="mouse"
            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
            style={{ fill: "none", strokeWidth: "20px" }}
          />
        </svg>

        <p className="fs-6 py-2 ">Scroll down</p>
      </div>

      <div className="page2 my-5" id="features">
        <div className="py-3 d-flex justify-content-center align-items-center">
          <div className="p-3 info d-flex flex-column justify-content-center align-items-center">
            <h2>Why Algocraft? What does it offers?</h2>
            <p className="fs-4">
              Track your learning progress and find all resources in one
              place—everything you need, conveniently available.
            </p>
          </div>
        </div>
        <div className="container text-center ">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <Fade top>
              <div className="col">
                <div
                  className="card  mb-3"
                  style={{
                    maxWidth: "18rem",
                    borderBottom: "5px solid #FF9933",
                  }}
                >
                  <div className="card-header ">
                    <div
                      className="gola"
                      style={{ backgroundColor: "#FF9933" }}
                    >
                      <i className="fa-solid fa-network-wired fa-lg"></i>
                    </div>
                  </div>
                  <div className="card-body ">
                    <h5 className="card-title" style={{ color: "#FF9933" }}>
                      DSA Sheets
                    </h5>
                    <p className="card-text">
                      Elevate your understanding of Data Structures and
                      Algorithms meticulously with curated DSA sheets from
                      famous achievers.
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade top>
              <div className="col">
                <div
                  className="card  mb-3"
                  style={{
                    maxWidth: "18rem",
                    borderBottom: "5px solid cornflowerblue",
                  }}
                >
                  <div className="card-header ">
                    <div
                      className="gola"
                      style={{ backgroundColor: "cornflowerblue" }}
                    >
                      <i className="fa-solid fa-trophy fa-lg"></i>
                    </div>
                  </div>
                  <div className="card-body text-primary">
                    <h5
                      className="card-title"
                      style={{ color: "cornflowerblue" }}
                    >
                      Upcoming contests
                    </h5>
                    <p className="card-text">
                      Prepare for success in the dynamic world of competitive
                      coding by staying informed about and gearing up for
                      upcoming coding contests.
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade top>
              <div className="col">
                <div
                  className="card  mb-3"
                  style={{ maxWidth: "18rem", borderBottom: "5px solid green" }}
                >
                  <div className="card-header ">
                    <div className="gola" style={{ backgroundColor: "green" }}>
                      <i className="fa-solid fa-vault fa-lg"></i>
                    </div>
                  </div>
                  <div className="card-body text-primary">
                    <h5 className="card-title" style={{ color: "green" }}>
                      Coding Resources
                    </h5>
                    <p className="card-text">
                      Empower your coding journey with an extensive collection
                      of resources, ranging from tutorials and guides to
                      frameworks and libraries.
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade top>
              <div className="col">
                <div
                  className="card  mb-3"
                  style={{ maxWidth: "18rem", borderBottom: "5px solid red" }}
                >
                  <div className="card-header ">
                    <div className="gola" style={{ backgroundColor: "red" }}>
                      <i className="fa-solid fa-comments fa-lg"></i>
                    </div>
                  </div>
                  <div className="card-body text-primary">
                    <h5 className="card-title" style={{ color: "red" }}>
                      Discussion
                    </h5>
                    <p className="card-text">
                      Engage in a community where coders of all levels come
                      together to discuss coding challenges, share interview
                      experiences, and collaboratively help each other.
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade top>
              <div className="col">
                <div
                  className="card  mb-3"
                  style={{
                    maxWidth: "18rem",
                    borderBottom: "5px solid purple",
                  }}
                >
                  <div className="card-header ">
                    <div className="gola" style={{ backgroundColor: "purple" }}>
                      <i className="fa-solid fa-terminal fa-lg"></i>
                    </div>
                  </div>
                  <div className="card-body text-primary">
                    <h5 className="card-title" style={{ color: "purple" }}>
                      Code editor
                    </h5>
                    <p className="card-text">
                      Immerse yourself in a seamless coding experience with our
                      user-friendly code editor, equipped with features designed
                      to enhance productivity.
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade top>
              <div className="col">
                <div
                  className="card  mb-3"
                  style={{
                    maxWidth: "18rem",
                    borderBottom: "5px solid maroon",
                  }}
                >
                  <div className="card-header ">
                    <div className="gola" style={{ backgroundColor: "maroon" }}>
                      <i className="fa-solid fa-file fa-lg"></i>
                    </div>
                  </div>
                  <div className="card-body text-primary">
                    <h5 className="card-title" style={{ color: "maroon" }}>
                      jobs doors (coming soon)
                    </h5>
                    <p className="card-text">
                      Navigate your career path with confidence by exploring job
                      opportunities, career advice, and networking possibilities
                      at our resume/job fair section
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <hr className="hr1"></hr>
      <div className="page3 my-5">
        <div className="container faq">
          <h3 className="py-2">FAQ's..</h3>
          <div
            className="accordion accordion-flush custom-accordion"
            id="accordionFlushExample"
          >
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Placeholder content for this accordion, which is intended to
                  demonstrate the <code>.accordion-flush</code> className. This
                  is the first item's accordion body.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Placeholder content for this accordion, which is intended to
                  demonstrate the <code>.accordion-flush</code> className. This
                  is the second item's accordion body. Let's imagine this being
                  filled with some actual content.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Placeholder content for this accordion, which is intended to
                  demonstrate the <code>.accordion-flush</code> className. This
                  is the third item's accordion body. Nothing more exciting
                  happening here in terms of content, but just filling up the
                  space to make it look, at least at first glance, a bit more
                  representative of how this would look in a real-world
                  application.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr2"></hr>
      <div className="page4 my-5">
        <div className="container ">
          <h2 className="text-center">Join our Coding community</h2>
          <p className="text-center">
            If you would like to keep up on the latest posts and courses, come
            by and connect with us on the following links.
          </p>
          <div className="my-5 d-flex justify-content-between align-items-center">
            <div className="github">
              <a
                href="https://github.com/Dhruvil2511/Algocraft"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-github fa-2xl "></i>
              </a>
              <span className="ps-3">Github</span>
            </div>
            <div className="linkedin">
              <a
                href="https://www.linkedin.com/in/dhruvil-prajapati-187759221/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-linkedin fa-2xl"></i>
              </a>
              <span className="ps-3">Linkedin</span>
            </div>
            <div className="mail">
              <a
                href="mailto:dhruvilprajapati2003@gmail.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-solid fa-envelope fa-2xl"></i>
              </a>
              <span className="ps-3">Email</span>
            </div>
            <div className="discord">
              <a href="#" target="_blank" rel="noreferrer noopener">
                <i className="fa-brands fa-discord fa-2xl"></i>
              </a>
              <span className="ps-3">Discord</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer text-center">
        <div className="d-flex flex-column h-100">
          <footer className="w-100 py-4 flex-shrink-0 text-center">
            <div className="container py-4">
              <div className="row gy-4 ">
                <div className="col-lg-4 col-md-6">
                  <div
                    className="gola m-auto"
                    style={{
                      background:
                        "var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%)",
                    }}
                  >
                    <i className="fa-solid fa-code fa-lg "></i>
                  </div>
                  <p className="small py-2 ">
                    An ultimate platform to help you crack your Software
                    engineering interview.
                  </p>
                  <p className="small   mb-0">
                    &copy; Copyrights. All rights reserved.
                  </p>
                </div>
                <div className="col-lg-2 col-md-6">
                  <h5 className=" mb-3">Algocraft</h5>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <Link className="text-links" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="text-links" to="/about-us">
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-links"
                        to="mailto:dhruvilprajapati2003@gmail.com"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <a className="text-links" href="/upcoming-updates">
                        Future scopes
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6">
                  <h5 className=" mb-3">User</h5>

                  <ul className="list-unstyled text-muted">
                    {!user ? (
                      <React.Fragment>
                        <li>
                          <a className="text-links" href="/login">
                            Login
                          </a>
                        </li>
                        <li>
                          <a className="text-links" href="/register">
                            Create Account
                          </a>
                        </li>
                      </React.Fragment>
                    ) : null}
  
                    <li>
                      <a className="text-links" href="/">
                        DMCA
                      </a>
                    </li>
                    <li>
                      <a className="text-links" href="/">
                        Terms of use
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                  <h5 className=" mb-3">Newsletter</h5>
                  <p className="small ">
                    Subscribe us if you wish to receive updates and connect with
                    us.
                  </p>
                  <form onSubmit={handleNewsletterSubmit}>
                    <div className="input-group mb-3">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <button
                        className="grad-btn"
                        id="button-addon2"
                        type="submit"
                      >
                        Send{" "}
                        <div className="hoverEffect">
                          <div></div>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
