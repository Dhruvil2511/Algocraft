import React from 'react'
import Lottie from 'lottie-react'
import { Navigation } from './Navigation'
import notfound from "../../assets/animations/notfound.json"
const NotFound = () => {
  return (
    <>
        <Navigation/>
       <div className="container d-flex justify-content-center align-items-center">
       <Lottie
                animationData={notfound}
                loop={true}
                style={{ width: "80%" }}
              ></Lottie>
       </div>
    </>
  )
}

export default NotFound