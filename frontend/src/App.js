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
  // const [isUserLoading, setIsUserLoading] = useState(true);

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
          <Route exact path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/:userid" />
            <Route path="/coding-resources" />
            <Route path="/upcoming-contests" />
            <Route path="/edit-profile" />
            <Route path="/coding-sheets/:author" />
            <Route path="/discussion?category=all" />
            <Route path="/discussion/interview-experience/:id" />
            <Route path="/discussion/algorithms/:id" />
            <Route path="/discussion/development/:id" />
            <Route path="/discussion/miscellaneous/:id" />
            <Route path="/coding-ide" />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
