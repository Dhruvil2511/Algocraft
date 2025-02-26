import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./components/Landing/Home";
import Layout from "./components/Content/Layout";
import { updateTheme } from "./utils/updateTheme";
import Logout from "./components/User/Logout";
import NotFound from "./components/Landing/NotFound";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Sidebar from "./components/Sidebar";
import DMCA from "./components/Landing/DMCA";
import Verified from "./components/User/Verified";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

const PrivateRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      let clientAccessToken = Cookies.get("accessToken");
      let clientRefreshToken = Cookies.get("refreshToken");

      if (clientAccessToken) {
        setIsAuthenticated(true);
      } else if (clientRefreshToken) {
        try {
          const response = await axios.post(
            process.env.REACT_APP_BASE_URL + "/api/v1/users/refresh-token",
            { refreshToken: clientRefreshToken }
          );
          Cookies.set("accessToken", response.data.data.accessToken, { expires: 1 });
          Cookies.set("refreshToken", response.data.data.refreshToken, { expires: 10 });
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
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
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  async function checkCookie() {
    return new Promise((resolve) => {
      var cookieEnabled = navigator.cookieEnabled;
      if (!cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie") !== -1;
      }
      resolve(cookieEnabled);
    }).then((cookieEnabled) => {
      if (!cookieEnabled) {
        showCookieFail();
      }
    });
  }

  function showCookieFail() {
    toast("Please enable 3rd party cookies to login.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: localStorage.getItem("theme") || "dark",
      transition: Bounce,
    });
  }
  useEffect(() => {
    const checkAndSetCookie = async () => {
      const isEnabled = await checkCookie();
      const theme = isEnabled ? localStorage?.getItem("theme") : "dark";
      if (theme === "dark") updateTheme(false);
      else if (theme === "light") updateTheme(true);
    };

    checkAndSetCookie();

    return () => { };
  }, []);

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

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dmca_policy" element={<DMCA />} />
          <Route path="/user/:id/verify/:token" element={<Verified />} />
          <Route
            element={
              <div className="content">
                <Sidebar />
                <Outlet />
              </div>
            }
          >
            {/* Public routes */}
            <Route path="/:userid" element={<Layout />} />
            <Route path="/coding-resources" element={<Layout />} />
            <Route path="/upcoming-contests" element={<Layout />} />
            <Route path="/coding-sheets/:author" element={<Layout />} />
            <Route path="/discussion" element={<Layout />} />
            <Route path="/discussion/interview-experience/:id" element={<Layout />} />
            <Route path="/discussion/algorithms/:id" element={<Layout />} />
            <Route path="/discussion/development/:id" element={<Layout />} />
            <Route path="/discussion/miscellaneous/:id" element={<Layout />} />
            <Route path="/coding-ide" element={<Layout />} />

            {/* Protected routes */}
            <Route
              path="/edit-profile"
              element={
                <PrivateRoutes>
                  <Layout />
                </PrivateRoutes>
              }
            />
            <Route
              path="/discussion/new-post"
              element={
                <PrivateRoutes>
                  <Layout />
                </PrivateRoutes>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
