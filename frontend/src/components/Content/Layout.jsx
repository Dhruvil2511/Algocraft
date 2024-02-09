import React, { useEffect, useState } from "react";
import OffcanvasNavbar from "../Content/Navigation/OffcanvasNavbar";
import CodingSheet from "./CodingSheet";
import UpcomingContests from "./UpcomingContests";
import CodingResources from "./CodingResources";
import Discussion from "../Content/Discussion/Discussion";
import CodingIDE from "../Content/CodeEditor/CodingIDE";
import DiscussionThread from "../Content/Discussion/DiscussionThread";
import MobileOffcanvasNavbar from "../Content/Navigation/MobileOffcanvasNavbar";
import Profile from "../User/Profile";
import { useParams } from "react-router-dom";
import axios from "axios";

const Layout = ({ user }) => {
  const [mainContainerPadding, setMainContainerPadding] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  function CheckContentPath() {
    let { userid } = useParams();
    let path = window.location.pathname;

    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user",
            {
              withCredentials: true,
            }
          );
          setUser(response.data.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUser();
    }, []);

    if (path.includes("/coding-sheets/")) return <CodingSheet user={user} />;
    else if (path === "/upcoming-contests")
      return <UpcomingContests user={user} />;
    else if (path === "/coding-resources")
      return <CodingResources user={user} />;
    else if (path === "/discussion") return <Discussion user={user} />;
    else if (path === "/coding-ide") return <CodingIDE user={user} />;
    else if (
      path.startsWith("/discussion/interview-experience/") ||
      path.startsWith("/discussion/algorithms/") ||
      path.startsWith("/discussion/development/") ||
      path.startsWith("/discussion/miscellaneous/")
    )
      return <DiscussionThread />;
    else if (userid) return <Profile userId={userid} />;
  }

  function CheckDevice() {
    if (window.screen.width <= 1431) {
      return <MobileOffcanvasNavbar user={user} />;
    }
    return <OffcanvasNavbar user={user} />;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/coding-ide") {
      setMainContainerPadding("10px 0 0 0");
    } else {
      setMainContainerPadding("");
    }
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            height: "45px",
            width: "45px",
            border: "none",
            borderRadius: "50px",
            fontSize: "20px",
            bottom: "40px",
            right: "40px",
            background:
              "var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%)",
            color: "var(--mainTextColor)",
            textAlign: "center",
          }}
        >
          <i className="fa-solid fa-chevron-up fa-xl"></i>
        </button>
      )}
      <div className="content ">
        <CheckDevice />
        <div className="main-content">
          <div className="container-fluid d-flex justify-content-center align-items-center">
            <div
              className="container main-container"
              style={{ padding: mainContainerPadding }}
            >
              {CheckContentPath()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
