import React from "react";
import Lottie from "lottie-react";
import verify from "../../assets/animations/verify.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

const Verified = () => {
  const { id, token } = useParams();
  const [isEmailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyEmail() {
      await axios
        .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/verify-email", {
          params: {
            id: id,
            token: token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setEmailVerified(true);
          }
        })
        .catch((err) => {
          const {  userMessage } = err.response.data;
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
    }
    verifyEmail();
  }, []);
  return (
    <>
      <div className="parent">
        <div className="leftpart-auth">
          <div className="my-3 d-flex justify-content-center align-items-center flex-column">
            <div
              className="icon"
              style={{
                background:
                  "var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%))",
              }}
            >
              <i
                className="fa-solid fa-code fa-2xl"
                style={{ color: "var(--mainTextColor)" }}
              ></i>
            </div>
            <h1 className="text-center">Welcome to Algocraft</h1>
          </div>
        </div>
        {isEmailVerified ? (
          <div className="rightpart-auth  flex-column">
            <div className="drop-in container d-flex justify-content-center align-items-center">
              <Lottie
                animationData={verify}
                loop={true}
                style={{ width: "40%" }}
              ></Lottie>
              <h3 className="mt-4 drop-in-2">Email Verified</h3>
            </div>
            <button
              onClick={() => navigate("/login")}
              to="/login"
              className="grad-btn w-25 drop-in-3"
            >
              {" "}
              <div className="hoverEffect ">
                <div className="w-100"></div>
              </div>
              Login
            </button>
            {/* <Link  className="">Login</Link> */}
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              background: "transparent", // semi-transparent black
              zIndex: 9999, // higher z-index to ensure it's above other elements
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>Verifying...</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Verified;
