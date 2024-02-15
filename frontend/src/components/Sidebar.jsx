import React, { useState, useEffect } from "react";
import MobileOffcanvasNavbar from "./Content/Navigation/MobileOffcanvasNavbar";
import OffcanvasNavbar from "./Content/Navigation/OffcanvasNavbar";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import Lottie from "lottie-react";
import bigLoader from "../assets/animations/bigLoader.json";
const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );
        setUsername(response.data.data.user.username);
        setAvatar(response.data.data.user.avatar);
      } catch (error) {
        toast("Error fetching user data:", {
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
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const CheckDevice = () => {
    if (window.screen.width <= 1431) {
      return <MobileOffcanvasNavbar username={username} avatar={avatar} />;
    } else {
      return <OffcanvasNavbar username={username} avatar={avatar} />;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Lottie
            animationData={bigLoader}
            loop={true}
            style={{ width: "80%" }}
          ></Lottie>
        </div>
      ) : (
        CheckDevice()
      )}
    </>
  );
};

export default React.memo(Sidebar);
