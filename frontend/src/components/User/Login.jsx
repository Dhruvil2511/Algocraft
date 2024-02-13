import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Cookies from "js-cookie";
import "./User.css";
const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/coding-sheets/striver");
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(user);
    if (user) navigate("/coding-sheets/striver");
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/v1/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          const { accessToken, refreshToken } = res.data.data;
          Cookies.set("accessToken", accessToken);
          Cookies.set("refreshToken", refreshToken);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        const status = err.response.status;
        let toastmessage = "";
        if (status === 401) toastmessage = "Invalid Password";
        else if (status === 404) toastmessage = "User not registered";
        else toastmessage = "Server Error";

        toast(toastmessage, {
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
  return (
    <>
      <div className="parent">
        <a href="/">
          <i
            className="fa-solid fa-left-long fa-xl"
            style={{
              position: "absolute",
              top: "5%",
              left: "2%",
              color: "#ffffff",
            }}
          ></i>
        </a>

        <div className="leftpart-auth">
          <div className="my-3 d-flex justify-content-center align-items-center flex-column">
            <div className="icon">
              <i
                className="fa-solid fa-code fa-2xl"
                style={{ color: "#000000" }}
              ></i>
            </div>
            <h1 className="text-center">Algocraft</h1>
          </div>
        </div>
        <div className="rightpart-auth flex-column">
          <h3 className="text-decoration-underline">
            Create an Account or login
          </h3>
          {isLoading && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
                zIndex: 9999, // higher z-index to ensure it's above other elements
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <form className="form mt-2" onSubmit={handleSubmit}>
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <svg
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_3" data-name="Layer 3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
              </svg>
              <input
                type="email"
                className="input"
                placeholder="Enter your Email.."
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex-column">
              <label>Password </label>
            </div>
            <div className="inputForm">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                type="password"
                className="input"
                placeholder="Enter your Password"
                name="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="flex-row">
              <span className="span">Forgot password?</span>
            </div>
            <button className="grad-btn w-100">
              {" "}
              <div className="hoverEffect ">
                <div className="w-100"></div>
              </div>
              Sign In
            </button>
            <p className="p">
              Don't have an account?{" "}
              <a href="register" className="span">
                Sign Up
              </a>
            </p>
            <p className="p line">Or With</p>

            <div className="d-flex justify-content-center align-items-center">
              <button className="options google">
                <svg
                  version="1.1"
                  width="20"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <path
                    style={{ fill: "#FBBB00" }}
                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"
                  ></path>
                  <path
                    style={{ fill: "#518EF8" }}
                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                  ></path>
                  <path
                    style={{ fill: "#28B446" }}
                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                  ></path>
                  <path
                    style={{ fill: "#F14336" }}
                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z"
                  ></path>
                </svg>
                Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
