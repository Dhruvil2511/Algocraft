import React from 'react'
import OffcanvasNavbar from './OffcanvasNavbar'
import CodingSheet from './CodingSheet';
import UpcomingContests from './UpcomingContests';

function CheckContentPath() {
  let path = window.location.pathname;
  if (path === '/coding-sheets') return <CodingSheet />;
  else if (path === '/upcoming-contests') return <UpcomingContests />
}
const Layout = () => {
  return (
    <>
      <div className="content d-flex">
        <OffcanvasNavbar />
        <div className="main-content">
          <CheckContentPath />
        </div>
      </div>
    </>
  )
}

export default Layout;