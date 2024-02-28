import React, { useState, useEffect } from "react";
import MobileOffcanvasNavbar from "./Content/Navigation/MobileOffcanvasNavbar";
import OffcanvasNavbar from "./Content/Navigation/OffcanvasNavbar";
import axios from "axios";
import Cookies from "js-cookie";
const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const { username, avatar } = JSON.parse(storedUser);
        setUsername(username);
        setAvatar(avatar);
      } else {
        setIsLoading(true);
        await axios
          .get(process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user", {
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              setUsername(res.data.data.user.username);
              localStorage.setItem(
                "currentUser",
                JSON.stringify({
                  username: res.data.data.user.username,
                  avatar: res.data.data.user.avatar,
                })
              );
              setAvatar(res.data.data.user.avatar);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              Cookies.remove("accessToken");
              Cookies.remove("refreshToken");
              window.location.href = "/login";
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
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
