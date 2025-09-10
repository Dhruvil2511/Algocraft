import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import codingAnimation from "../../assets/animations/home.json";
import ballAnimation from "../../assets/animations/ball-animation.json";
import "./Landing.css";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { Navigation } from "./Navigation";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ShadcnDemo from "../ShadcnDemo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  // Animation variants for framer-motion
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    if (Cookies.get("accessToken")) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, []);

  async function handleNewsletterSubmit(event) {
    if (email.trim() === "") return;
    event.preventDefault();

    await axios
      .post(import.meta.env.VITE_BASE_URL + "/api/v1/newsletter/add-user", {
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
            theme: localStorage.getItem("theme") || "dark",
            transition: Bounce,
          });
        }
      });
    setEmail("");
  }
  return (
    <>

      <Navigation isAuth={isAuthenticated} />
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
                <Button
                  onClick={() => navigate("/coding-sheets/striver")}
                  className="grad-btn mt-2 drop-in-4"
                  style={{ overflow: "hidden" }}
                >
                  Lets Crack it
                  <div className="hoverEffect">
                    <div></div>
                  </div>
                </Button>
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
        <motion.div 
          className="container text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <motion.div variants={fadeInUp}>
              <div className="col">
                <Card 
                  className="mb-3 max-w-sm border-b-4 border-b-orange-400"
                >
                  <CardHeader className="text-center">
                    <div
                      className="gola mx-auto"
                      style={{ backgroundColor: "#FF9933" }}
                    >
                      <i className="fa-solid fa-network-wired fa-lg"></i>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-orange-400 mb-3">
                      DSA Sheets
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Elevate your understanding of Data Structures and
                      Algorithms meticulously with curated DSA sheets from
                      famous achievers.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="col">
                <Card 
                  className="mb-3 max-w-sm border-b-4 border-b-blue-500"
                >
                  <CardHeader className="text-center">
                    <div
                      className="gola mx-auto"
                      style={{ backgroundColor: "cornflowerblue" }}
                    >
                      <i className="fa-solid fa-trophy fa-lg"></i>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-blue-500 mb-3">
                      Upcoming contests
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Prepare for success in the dynamic world of competitive
                      coding by staying informed about and gearing up for
                      upcoming coding contests.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="col">
                <Card 
                  className="mb-3 max-w-sm border-b-4 border-b-green-500"
                >
                  <CardHeader className="text-center">
                    <div
                      className="gola mx-auto"
                      style={{ backgroundColor: "green" }}
                    >
                      <i className="fa-solid fa-vault fa-lg"></i>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-green-500 mb-3">
                      Coding Resources
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Empower your coding journey with an extensive collection
                      of resources, ranging from tutorials and guides to
                      frameworks and libraries.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="col">
                <Card 
                  className="mb-3 max-w-sm border-b-4 border-b-red-500"
                >
                  <CardHeader className="text-center">
                    <div
                      className="gola mx-auto"
                      style={{ backgroundColor: "red" }}
                    >
                      <i className="fa-solid fa-comments fa-lg"></i>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-red-500 mb-3">
                      Discussion
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Engage in a community where coders of all levels come
                      together to discuss coding challenges, share interview
                      experiences, and collaboratively help each other.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="col">
                <Card 
                  className="mb-3 max-w-sm border-b-4 border-b-purple-500"
                >
                  <CardHeader className="text-center">
                    <div
                      className="gola mx-auto"
                      style={{ backgroundColor: "purple" }}
                    >
                      <i className="fa-solid fa-terminal fa-lg"></i>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-purple-500 mb-3">
                      Code editor
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Immerse yourself in a seamless coding experience with our
                      user-friendly code editor, equipped with features designed
                      to enhance productivity.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="col">
                <Card 
                  className="mb-3 max-w-sm border-b-4 border-b-red-800"
                >
                  <CardHeader className="text-center">
                    <div
                      className="gola mx-auto"
                      style={{ backgroundColor: "maroon" }}
                    >
                      <i className="fa-solid fa-file fa-lg"></i>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-red-800 mb-3">
                      Jobs doors (coming soon)
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Navigate your career path with confidence by exploring job
                      opportunities, career advice, and networking possibilities
                      at our resume/job fair section
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <hr className="hr1"></hr>
      <div className="page3 my-5">
        <div className="container faq">
          <h3 className="py-2">Frequently Asked Questions</h3>
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
                  How can I sign up for Algocraft?
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Signing up for Algocraft is easy! Simply click on the "Create
                  Account" button in the top right corner of the page, fill in
                  your details, and you're all set to explore the platform.
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
                  How do I access coding resources on Algocraft?
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  To access coding resources on Algocraft, simply navigate to
                  the "Coding Resources" section on the home page. Here, you'll
                  find a wide range of tutorials, guides, frameworks, and
                  libraries to empower your coding journey.
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
                  Is Algocraft suitable for beginners?
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Yes, Algocraft is designed to cater to coders of all levels,
                  including beginners. Whether you're just starting your coding
                  journey or looking to enhance your skills, you'll find
                  valuable resources, discussions, and contests to support your
                  learning experience.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  How can I participate in coding contests on Algocraft?
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Participating in coding contests on Algocraft is simple! Keep
                  an eye on the "Upcoming Contests" section on the home page to
                  stay informed about upcoming contests. Once a contest is live,
                  click on the contest link, register if required, and start
                  coding!
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                >
                  How do I contribute to the Algocraft community?
                </button>
              </h2>
              <div
                id="flush-collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Contributing to the Algocraft community is highly encouraged!
                  You can contribute by sharing your coding knowledge and
                  experiences in the discussion forums, submitting coding
                  resources, participating in contests, and helping fellow
                  coders with their queries.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSix"
                  aria-expanded="false"
                  aria-controls="flush-collapseSix"
                >
                  How can I report a bug or suggest a feature for Algocraft?
                </button>
              </h2>
              <div
                id="flush-collapseSix"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  If you encounter a bug or have a feature suggestion for
                  Algocraft, please feel free to reach out to us through our
                  contact page or email us directly at
                  dhruvilprajapati2003@gmail.com Your feedback is invaluable in
                  helping us improve the platform for the entire community.
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
              <a href="/" target="_blank" rel="noreferrer noopener">
                <i className="fa-brands fa-discord fa-2xl"></i>
              </a>
              <span className="ps-3">Discord</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shadcn/ui Demo Section */}
      <div className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2>New UI Components with Shadcn/ui</h2>
            <p className="text-muted">Modern, accessible components built with Tailwind CSS</p>
          </div>
          <ShadcnDemo />
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
                    {!isAuthenticated ? (
                      <React.Fragment>
                        <li>
                          <Link className="text-links" to="/login">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="text-links" to="/register">
                            Create Account
                          </Link>
                        </li>
                      </React.Fragment>
                    ) : null}

                    <li>
                      <Link className="text-links" to="/dmca_policy">
                        DMCA
                      </Link>
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
                    <div className="flex gap-2 mb-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        className="grad-btn"
                      >
                        Send
                      </Button>
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
