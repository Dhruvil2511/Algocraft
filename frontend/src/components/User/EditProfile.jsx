import React, { useEffect, useState } from "react";
import Loader from "../Content/Loader.jsx";
import axios from "axios";
import Cookies from "js-cookie";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    location: "",
    github: "",
    linkedin: "",
  });
  const [editModes, setEditModes] = useState({
    username: false,
    fullname: false,
    location: false,
    github: false,
    linkedin: false,
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedField, setEditedField] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    setFormData({
      username: user?.username || "",
      fullname: user?.fullname || "",
      location: user?.location || "",
      github: user?.github || "",
      linkedin: user?.linkedin || "",
    });
    if (user) setIsLoading(false);
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the edited field name from the hidden field
    // const editedField = document.getElementById("editedField").value;
    // console.log(editedField, formData[editedField]);
    // If a field was edited, create an object with only the edited field
    if (editedField.trim() !== "") {
      const updatedData = {
        [editedField]: formData[editedField],
      };
      console.log(updatedData);
      await axios
        .patch(
          process.env.REACT_APP_BASE_URL + "/api/v1/users/update-account",
          updatedData,
          { withCredentials: true }
        )
        .then((response) => {
          // Handle successful update
          console.log("Field updated successfully:", response.data);
          // Update the local state with the new data
          setFormData((prevData) => ({
            ...prevData,
            [editedField]: response.data[editedField],
          }));
          // Clear the edited field name
          editModes[editedField] = false;
          setEditedField("");
          setFocusedField("");
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating field:", error);
        });
    } else {
      // No field was edited, so do nothing
      console.log("No field was edited.");
    }
  };

  const handleInputFocus = (fieldName) => {
    editModes[fieldName] ? setFocusedField("") : setFocusedField(fieldName);

    // Deactivate all edit modes
    const updatedEditModes = {};
    for (const key in editModes) {
      updatedEditModes[key] = false;
    }
    // Activate edit mode for the clicked field
    updatedEditModes[fieldName] = true;

    setEditModes(updatedEditModes);
    setEditedField(fieldName);
  };

  async function handleDeleteAccount() {
    await axios
      .delete(process.env.REACT_APP_BASE_URL + "/api/v1/users/delete-account", {
        withCredentials: true,
      })
      .catch((res) => {
        if (res.status === 200) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/";
        }
      })
      .then((err) => {
        console.error(
          "error deleting account try again later or contact adming"
        );
      });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      document.querySelector(".save_cancel").style.display = "flex";
      setAvatar(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  async function handleAvatarUpload(event) {
    event.preventDefault();
    // console.log(avatar);
    if (!avatar) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);

    await axios
      .patch(
        process.env.REACT_APP_BASE_URL + "/api/v1/users/update-avatar",
        formData,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        document.querySelector(".save_cancel").style.display = "none";
      });
  }
  return (
    <>
      {isLoading ? (
        <div className="p-4 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="daddy d-flex justify-content-center align-items-center flex-column">
          <div className="header">
            <h4 className="my-3" style={{ color: "var(--mainTextColor)" }}>
              Edit Profile
            </h4>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleAvatarUpload} encType="multipart/form-data">
              <div className="d-flex justify-content-center align-items-center flex-column p-3">
                <div
                  className="rounded-square-pfp editpfp m-1"
                  style={{
                    height: "150px",
                    width: "150px",
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={() => document.getElementById("avatar").click()}
                    type="button"
                    className="w-100 h-100 btn-list d-flex justify-content-center align-items-center"
                  >
                    <div className="icon-container">
                      <i className="edit-icon fa-solid fa-square-pen fa-2xl"></i>
                      {console.log(user)}
                      {user?.avatar ? (
                        <img
                          src={previewUrl ? previewUrl : user?.avatar}
                          alt="Avatar"
                          style={{ width: "150px", height: "150px" }}
                        />
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          {" "}
                          <div className="gola">
                            <i className="default-icon fa-solid fa-user fa-xl"></i>
                          </div>
                          <div className="fs-6">
                            {" "}
                            Click here to upload avatar{" "}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                <div
                  className="save_cancel justify-content-center align-items-center"
                  style={{ display: "none" }}
                >
                  <button className="btn-list text-success" type="submit">
                    Save
                  </button>
                  <button
                    className=" btn-list text-danger"
                    type="button"
                    onClick={() => {
                      document.querySelector(".save_cancel").style.display =
                        "none";
                      setPreviewUrl(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            <div className="d-flex justify-content-center align-items-center flex-column p-5">
              <div className="fullname">
                <h5>{user?.fullname}</h5>
              </div>
              <div className="username">Algocraft ID: {user?.username}</div>
            </div>
          </div>

          <div className="w-75 d-flex justify-content-center align-items-center flex-column p-2">
            <form className="w-75" onSubmit={handleSubmit}>
              <input
                type="hidden"
                id="editedField"
                name="editedField"
                value={editedField}
              />

              <div className="d-flex justify-content-around">
                <span className="fs-3 ">Your Info</span>
              </div>
              <div className="w-100 my-4 d-flex justify-content-around align-items-center">
                <label htmlFor="username">Username:</label>
                <input
                  className="w-50 bg-transparent"
                  style={{
                    color: "var(--mainTextColor)",
                    border:
                      focusedField === "username"
                        ? "1px solid var(--mainTextColor)"
                        : "none",
                  }}
                  type="text"
                  id="username"
                  name="username"
                  value={formData?.username}
                  onChange={handleChange}
                  required
                  disabled={!editModes.username}
                />
                {editModes.username ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "30%" }}
                  >
                    <button className="btn-list text-success" type="submit">
                      Save
                    </button>
                    <button
                      className=" btn-list text-danger"
                      type="button"
                      onClick={() => {
                        setEditModes((prevModes) => ({
                          ...prevModes,
                          username: false,
                        }));
                        setFocusedField(""); // Clear the focused field as well if needed
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-list text-primary"
                    type="button"
                    style={{ width: "30%" }}
                    onClick={() => handleInputFocus("username")}
                  >
                    Edit{" "}
                  </button>
                )}
              </div>
              <div
                className="w-100 my-4 d-flex justify-content-around align-items-center"
                style={{ width: "30%" }}
              >
                <label htmlFor="fullname">Full Name:</label>
                <input
                  disabled={!editModes.fullname}
                  className="w-50 bg-transparent"
                  style={{
                    color: "var(--mainTextColor)",
                    border:
                      focusedField === "fullname"
                        ? "1px solid var(--mainTextColor)"
                        : "none",
                  }}
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {editModes.fullname ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "30%" }}
                  >
                    <button className="btn-list text-success" type="submit">
                      Save
                    </button>
                    <button
                      className=" btn-list text-danger"
                      type="button"
                      onClick={() => {
                        setEditModes((prevModes) => ({
                          ...prevModes,
                          fullname: false,
                        }));
                        setFocusedField(""); // Clear the focused field as well if needed
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-list text-primary"
                    type="button"
                    style={{ width: "30%" }}
                    onClick={() => handleInputFocus("fullname")}
                  >
                    Edit{" "}
                  </button>
                )}
              </div>

              <div className="w-100 my-4 d-flex justify-content-around align-items-center">
                <label htmlFor="location">Location:</label>

                <input
                  className="w-50 bg-transparent"
                  style={{
                    color: "var(--mainTextColor)",
                    border:
                      focusedField === "location"
                        ? "1px solid var(--mainTextColor)"
                        : "none",
                  }}
                  type="text"
                  id="location"
                  name="location"
                  value={formData?.location}
                  onChange={handleChange}
                  disabled={!editModes.location}
                />
                {editModes.location ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "30%" }}
                  >
                    <button className="btn-list text-success" type="submit">
                      Save
                    </button>
                    <button
                      className=" btn-list text-danger"
                      type="button"
                      onClick={() => {
                        setEditModes((prevModes) => ({
                          ...prevModes,
                          location: false,
                        }));
                        setFocusedField(""); // Clear the focused field as well if needed
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-list text-primary"
                    type="button"
                    style={{ width: "30%" }}
                    onClick={() => handleInputFocus("location")}
                  >
                    Edit{" "}
                  </button>
                )}
              </div>
              <div className="w-100 my-4  d-flex justify-content-around align-items-center">
                <label htmlFor="github">GitHub:</label>
                <input
                  className="w-50 bg-transparent ms-2"
                  style={{
                    color: "var(--mainTextColor)",
                    border:
                      focusedField === "github"
                        ? "1px solid var(--mainTextColor)"
                        : "none",
                  }}
                  type="text"
                  id="github"
                  name="github"
                  value={formData?.github}
                  onChange={handleChange}
                  disabled={!editModes.github}
                />
                {editModes.github ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "30%" }}
                  >
                    <button className="btn-list text-success" type="submit">
                      Save
                    </button>
                    <button
                      className=" btn-list text-danger"
                      type="button"
                      onClick={() => {
                        setEditModes((prevModes) => ({
                          ...prevModes,
                          github: false,
                        }));
                        setFocusedField(""); // Clear the focused field as well if needed
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-list text-primary"
                    type="button"
                    style={{ width: "30%" }}
                    onClick={() => handleInputFocus("github")}
                  >
                    Edit{" "}
                  </button>
                )}
                {/* {console.log(user)} */}
              </div>
              <div className="w-100 my-4 d-flex justify-content-around align-items-center">
                <label htmlFor="linkedin">LinkedIn:</label>
                <input
                  className="w-50 bg-transparent"
                  style={{
                    color: "var(--mainTextColor)",
                    border:
                      focusedField === "linkedin"
                        ? "1px solid var(--mainTextColor)"
                        : "none",
                  }}
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData?.linkedin}
                  onChange={handleChange}
                  disabled={!editModes.linkedin}
                />
                {editModes.linkedin ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "30%" }}
                  >
                    <button className="btn-list text-success" type="submit">
                      Save
                    </button>
                    <button
                      className=" btn-list text-danger"
                      type="button"
                      onClick={() => {
                        setEditModes((prevModes) => ({
                          ...prevModes,
                          linkedin: false,
                        }));
                        setFocusedField(""); // Clear the focused field as well if needed
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-list text-primary"
                    type="button"
                    style={{ width: "30%" }}
                    onClick={() => handleInputFocus("linkedin")}
                  >
                    Edit{" "}
                  </button>
                )}
              </div>
            </form>
            <div className="my-4 save d-flex justify-content-center align-items-center">
              <button
                data-bs-toggle="modal"
                type="button"
                data-bs-target="#deleteModal"
                className="options"
                style={{ backgroundColor: "red" }}
              >
                <i className="fa-solid fa-triangle-exclamation"></i> Delete
                Account
              </button>
            </div>

            <div
              className="modal fade"
              id="deleteModal"
              tabIndex="-1"
              aria-labelledby="deleteModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div
                  className="modal-content"
                  style={{ backgroundColor: "var(--secondaryColor)" }}
                >
                  <div className="modal-header">
                    <h1
                      className="modal-title text-danger fs-5"
                      id="deleteModalLabel"
                    >
                      Delete Account?
                    </h1>
                    <button
                      type="button"
                      className="btn-list"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ color: "var(--mainTextColor)" }}
                  >
                    Do you really want to delete your account? <br />
                    Don't you want help cracking interviews??
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="options bg-primary"
                      data-bs-dismiss="modal"
                    >
                      <i className="fa-solid fa-face-smile-beam"></i> NO!
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="options bg-danger"
                    >
                      <i className="fa-solid fa-face-frown"></i> Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
