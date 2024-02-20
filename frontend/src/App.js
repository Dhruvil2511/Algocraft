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
import { Bounce, ToastContainer } from "react-toastify";
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
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      let clientAccessToken = Cookies.get("accessToken");
      let clientRefreshToken = Cookies.get("refreshToken");

      if (clientAccessToken && clientRefreshToken) {
        setIsAuthenticated(true);
      } else if (!clientAccessToken && clientRefreshToken) {
        console.log(clientAccessToken, clientRefreshToken);
        try {
          const response = await axios.post(
            process.env.REACT_APP_BASE_URL + "/api/v1/users/refresh-token",
            { refreshToken: clientRefreshToken }
          );
          const { accessToken, refreshToken } = response.data.data;
          Cookies.set("accessToken", accessToken, {
            expires: 1,
          });
          Cookies.set("refreshToken", refreshToken, { expires: 10 });

          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false); // Update loading state
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

  // Return authenticated routes or navigate to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") updateTheme(false);
  else if (theme === "light") updateTheme(true);

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
              <PrivateRoutes>
                <div className="content">
                  <Sidebar />
                  <Outlet />
                </div>
              </PrivateRoutes>
            }
          >
            <Route path="/:userid" element={<Layout />} />
            <Route path="/coding-resources" element={<Layout />} />
            <Route path="/upcoming-contests" element={<Layout />} />
            <Route path="/edit-profile" element={<Layout />} />
            <Route path="/coding-sheets/:author" element={<Layout />} />
            <Route path="/discussion" element={<Layout />} />
            <Route
              path="/discussion/interview-experience/:id"
              element={<Layout />}
            />
            <Route path="/discussion/algorithms/:id" element={<Layout />} />
            <Route path="/discussion/development/:id" element={<Layout />} />
            <Route path="/discussion/miscellaneous/:id" element={<Layout />} />
            <Route path="/coding-ide" element={<Layout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
