import React, { useState, useEffect } from "react";
import MobileOffcanvasNavbar from "./Content/Navigation/MobileOffcanvasNavbar";
import OffcanvasNavbar from "./Content/Navigation/OffcanvasNavbar";
import axios from "axios";
import Cookies from "js-cookie";
const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials=true;
    const fetchUser = async () => {
      await axios
        .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setUsername(res.data.data.user.username);
            setAvatar(res.data.data.user.avatar);
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setIsLoading(false);
        });
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
      ) : (
        CheckDevice()
      )}
    </>
  );
};

export default React.memo(Sidebar);
