  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
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

  const SmallLayout = () => (
    <div className="content">
      {" "}
      <Sidebar />
      <Outlet />
    </div>
  );

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

            <Route element={<SmallLayout />}>
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
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </>
    );
  }

  export default App;
