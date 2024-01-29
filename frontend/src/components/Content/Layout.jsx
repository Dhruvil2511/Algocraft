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

function CheckContentPath() {
  let { userid } = useParams();
  let path = window.location.pathname;

  if (path === "/coding-sheets") return <CodingSheet />;
  else if (path === "/upcoming-contests") return <UpcomingContests />;
  else if (path === "/coding-resources") return <CodingResources />;
  else if (path === "/discussion") return <Discussion />;
  else if (path === "/coding-ide") return <CodingIDE />;
  else if (
    path.startsWith("/discussion/interview/") ||
    path.startsWith("/discussion/algorithms/") ||
    path.startsWith("/discussion/development/") ||
    path.startsWith("/discussion/miscellaneous/")
  )
    return <DiscussionThread />;
  else if (userid) return <Profile userId={userid} />;
}

function CheckDevice() {
  if (window.screen.width <= 1431) {
    return <MobileOffcanvasNavbar />;
  }
  return <OffcanvasNavbar />;
}
const Layout = () => {
  const [mainContainerPadding, setMainContainerPadding] = useState("");

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
