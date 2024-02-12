import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Landing/Home";
import Authentication from "./components/User/Authentication";
import Layout from "./components/Content/Layout";
import { updateTheme } from "./utils/updateTheme";
import Logout from "./components/User/Logout";
import NotFound from "./components/Landing/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") updateTheme(false);
  else if (theme === "light") updateTheme(true);
  const [user, setUser] = useState(null); // Initialize user state as null
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) setUser(res.data.data.user);
      } catch (err) {
        console.error("User not logged in");
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchCurrentUser();
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
      {isUserLoading && (
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
      )}

      <Router>
        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route path="/:userid" element={<Layout user={user} />} />
          <Route path="/edit-profile" element={<Layout user={user} />} />

          <Route path="/login" element={<Authentication user={user} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Authentication user={user} />} />
          <Route
            path="/coding-sheets/:author"
            element={<Layout user={user} />}
          />
          <Route path="/upcoming-contests" element={<Layout user={user} />} />
          <Route path="/coding-resources" element={<Layout user={user} />} />
          <Route
            path="/discussion?category=all"
            element={<Layout user={user} />}
          />
          <Route
            path="/discussion/interview-experience/:id"
            element={<Layout user={user} />}
          />
          <Route
            path="/discussion/algorithms/:id"
            element={<Layout user={user} />}
          />
          <Route
            path="/discussion/development/:id"
            element={<Layout user={user} />}
          />
          <Route
            path="/discussion/miscellaneous/:id"
            element={<Layout user={user} />}
          />
          <Route path="/coding-ide" element={<Layout user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
