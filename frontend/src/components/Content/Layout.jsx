import React from 'react'
import OffcanvasNavbar from './OffcanvasNavbar'
import CodingSheet from './CodingSheet';
import UpcomingContests from './UpcomingContests';
import CodingResources from './CodingResources';

function CheckContentPath() {
  let path = window.location.pathname;
  if (path === '/coding-sheets') return <CodingSheet />;
  else if (path === '/upcoming-contests') return <UpcomingContests />
  else if (path === '/coding-resources') return <CodingResources />
}
const Layout = () => {
  return (
    <>
      <div className="content d-flex">
        <OffcanvasNavbar />
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