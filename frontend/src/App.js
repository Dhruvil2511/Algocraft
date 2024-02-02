import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Landing/Home";
import Authentication from "./components/User/Authentication";
import Layout from "./components/Content/Layout";
import { updateTheme } from "./utils/updateTheme";
import Logout from "./components/User/Logout";
import NotFound from "./components/Landing/NotFound";

function App() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") updateTheme(false);
  else if (theme === "light") updateTheme(true);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:userid" element={<Layout />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Authentication />} />
          <Route path="/coding-sheets" element={<Layout />} />
          <Route path="/coding-sheets/striver" element={<Layout />} />
          <Route path="/coding-sheets/love-babbar" element={<Layout />} />
          <Route path="/coding-sheets/neetcode" element={<Layout />} />
          <Route path="/coding-sheets/apna-college" element={<Layout />} />
          <Route path="/upcoming-contests" element={<Layout />} />
          <Route path="/coding-resources" element={<Layout />} />
          <Route path="/discussion?category=all" element={<Layout />} />
          <Route path="/discussion/interview-experience/:id" element={<Layout />} />
          <Route path="/discussion/algorithms/:id" element={<Layout />} />
          <Route path="/discussion/development/:id" element={<Layout />} />
          <Route path="/discussion/miscellaneous/:id" element={<Layout />} />
          <Route path="/coding-ide" element={<Layout />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
