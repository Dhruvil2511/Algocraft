import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Landing/Home";
import Layout from "./components/Content/Layout";
import { updateTheme } from "./utils/updateTheme";
import Logout from "./components/User/Logout";
import NotFound from "./components/Landing/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Cookies from "js-cookie";
function App() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") updateTheme(false);
  else if (theme === "light") updateTheme(true);
  // const [user, setUser] = useState(null); // Initialize user state as null
  const [isUserLoading, setIsUserLoading] = useState(true);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* {isUserLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "110%",
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
      )} */}

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:userid" element={<Layout />} />
          <Route path="/coding-resources" element={<Layout />} />
          <Route path="/upcoming-contests" element={<Layout />} />
          <Route path="/edit-profile" element={<Layout />} />
          <Route path="/coding-sheets/:author" element={<Layout />} />
          <Route path="/discussion?category=all" element={<Layout />} />
          <Route
            path="/discussion/interview-experience/:id"
            element={<Layout />}
          />
          <Route path="/discussion/algorithms/:id" element={<Layout />} />
          <Route path="/discussion/development/:id" element={<Layout />} />
          <Route path="/discussion/miscellaneous/:id" element={<Layout />} />
          <Route path="/coding-ide" element={<Layout />} />

          <Route
            path="/login"
            element={ <Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
