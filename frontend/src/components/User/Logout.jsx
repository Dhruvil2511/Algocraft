import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/logout",
          {},
          { withCredentials: true }
        );
      } catch (err) {
      } finally {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        localStorage.removeItem("currentUser");
        window.location.href = "/";
      }
    };

    logout();
  }, []);

  return null; // Return null or an empty fragment since you don't need to render anything
};

export default Logout;
