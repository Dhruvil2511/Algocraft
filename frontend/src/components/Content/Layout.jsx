import React from 'react'
import OffcanvasNavbar from './OffcanvasNavbar'
import CodingSheet from './CodingSheet';
import UpcomingContests from './UpcomingContests';
import CodingResources from './CodingResources';
import Discussion from './Discussion';
import CodingIDE from './CodingIDE';
import DiscussionThread from './DiscussionThread';
import MobileOffcanvasNavbar from './MobileOffcanvasNavbar';

function CheckContentPath() {
  let path = window.location.pathname;
  if (path === '/coding-sheets') return <CodingSheet />;
  else if (path === '/upcoming-contests') return <UpcomingContests />
  else if (path === '/coding-resources') return <CodingResources />
  else if (path === '/discussion') return <Discussion />
  else if (path === '/coding-ide') return <CodingIDE />
  else if (path.startsWith('/discussion/interview/') || path.startsWith('/discussion/algorithms/') || path.startsWith('/discussion/development/') || path.startsWith('/discussion/miscellaneous/')) return <DiscussionThread />
}

function CheckDevice() {
  if (window.screen.width <= 1145) {
    return <MobileOffcanvasNavbar />
  }
  return <OffcanvasNavbar />
}
const Layout = () => {
  return (
    <>
      <div className="content ">
        <CheckDevice />
        <div className="main-content">
          <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="container main-container">
              <CheckContentPath />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;