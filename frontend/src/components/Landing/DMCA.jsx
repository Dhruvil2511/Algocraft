import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigation } from "./Navigation";
const DMCA = () => {
  const [user, setUser] = useState(null);

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
      }
    };
    fetchCurrentUser();
  }, []);
  return (
    <>
      <Navigation user={user} />
      <div className="container mt-5 h-100 d-flex justify-content-center align-items-center">
        <div className="p-5 daddy d-flex justify-content-center align-items-center flex-column">
          <h2>DMCA Policy</h2>
          <p>
            Algocraft respects the intellectual property rights of
            others and expects its users to do the same. It is our policy to
            respond to notices of alleged copyright infringement that comply
            with the Digital Millennium Copyright Act (DMCA). If you believe
            that your copyrighted work has been copied in a way that constitutes
            copyright infringement and is accessible on this website, please
            notify us by providing the following information:
          </p>
          <ol>
            <li>
              A physical or electronic signature of the copyright owner or a
              person authorized to act on their behalf.
            </li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed.
            </li>
            <li>
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit us to locate the material.
            </li>
            <li>
              Your contact information, including your address, telephone
              number, and an email address.
            </li>
            <li>
              A statement by you that you have a good faith belief that use of
              the material in the manner complained of is not authorized by the
              copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notification is accurate,
              and, under penalty of perjury, that you are authorized to act on
              behalf of the copyright owner.
            </li>
          </ol>
          <p>
            Please send your DMCA notice to{" "}
            <a className="text-underline text-success" href="mailto:dhruvilprajapati2003@gmail.com">
              dhruvilprajapati2003@gmail.com
            </a>
            . Upon receiving a valid DMCA notice, we will promptly remove or
            disable access to the infringing material.
          </p>
        </div>
      </div>
    </>
  );
};

export default DMCA;
