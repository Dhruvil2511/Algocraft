import React, { useEffect } from "react";
import axios from "axios";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/logout",
          {},
          { withCredentials: true }
        );
        window.location.href = "/";
      } catch (err) {
        console.error("Error logging out", err);
      }
    };

    logout();
  }, []);

  return null; // Return null or an empty fragment since you don't need to render anything
};

export default Logout;
