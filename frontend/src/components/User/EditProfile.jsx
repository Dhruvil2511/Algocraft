import React, { useState } from "react";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user?.username,
    fullname: user?.fullname || "",
    avatar: user?.avatar || "",
    location: user?.location || "",
    githubLink: user?.githubLink || "",
    linkedinLink: user?.linkedinLink || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here, e.g., update user profile
    console.log("Form submitted with data:", formData);
  };
  return (
    <>
      <div className="daddy d-flex justify-content-center align-items-center flex-column">
        <div className="header">
          <h4 className="my-3" style={{ color: "var(--mainTextColor)" }}>
            Edit Profile
          </h4>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center flex-column p-3">
            <div
              className="rounded-square-pfp editpfp m-1"
              style={{ height: "150px", width: "150px" }}
            >
              <button className="w-100 h-100 btn-list d-flex justify-content-center align-items-center">
                <div className="icon-container">
                  <i className="edit-icon fa-solid fa-square-pen fa-2xl"></i>
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="Avatar" />
                  ) : (
                    <div className="gola">
                      <i className="default-icon fa-solid fa-user fa-xl"></i>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column p-5">
            <div className="fullname">{user?.fullName}</div>
            <div className="username">Algocraft ID: {user?.username}</div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column p-5">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="avatar">Avatar URL:</label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="githubLink">GitHub Link:</label>
              <input
                type="text"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="linkedinLink">LinkedIn Link:</label>
              <input
                type="text"
                id="linkedinLink"
                name="linkedinLink"
                value={formData.linkedinLink}
                onChange={handleChange}
              />
            </div>
            <button className="options " style={{backgroundColor:"var(--green-shade)"}} type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
