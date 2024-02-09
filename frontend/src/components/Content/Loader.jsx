import React from "react";
import Lottie from "lottie-react";
import loader from "../../assets/animations/loader.json";
const Loader = () => {
  return (
    <>
      <div className="p-4 d-flex justify-content-center align-items-center">
        <Lottie
          animationData={loader}
          loop={true}
          style={{ width: "50%" }}
        ></Lottie>
      </div>
    </>
  );
};

export default Loader;
