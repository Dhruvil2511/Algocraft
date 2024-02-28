import React, { useEffect, useState } from "react";
import CodingSheet from "./CodingSheet";
import UpcomingContests from "./UpcomingContests";
import CodingResources from "./CodingResources";
import Discussion from "../Content/Discussion/Discussion";
import CodingIDE from "../Content/CodeEditor/CodingIDE";
import DiscussionThread from "../Content/Discussion/DiscussionThread";
import Profile from "../User/Profile";
import EditProfile from "../User/EditProfile";
import { useParams } from "react-router-dom";

const Layout = () => {
  const [mainContainerPadding, setMainContainerPadding] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  let { userid } = useParams();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/coding-ide") {
      setMainContainerPadding("10px 0 0 0");
    } else {
      setMainContainerPadding("");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function CheckContentPath() {
    let path = window.location.pathname;

    if (path.includes("/coding-sheets/")) return <CodingSheet />;
    else if (path === "/upcoming-contests") return <UpcomingContests />;
    else if (path === "/coding-resources") return <CodingResources />;
    else if (path === "/discussion" || path === "/discussion?category=all")
      return <Discussion />;
    else if (path === "/coding-ide") return <CodingIDE />;
    else if (
      path.startsWith("/discussion/interview-experience/") ||
      path.startsWith("/discussion/algorithms/") ||
      path.startsWith("/discussion/development/") ||
      path.startsWith("/discussion/miscellaneous/")
    )
      return <DiscussionThread />;
    else if (path.includes(`/edit-profile`)) {
      return <EditProfile />;
    } else if (userid) return <Profile userId={userid} />;
  }

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

  return (
    <>
      {isVisible && (
        <button
          className="scroller"
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
    </>
  );
};

export default Layout;
