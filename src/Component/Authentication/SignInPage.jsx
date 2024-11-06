import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { LogoContainer } from "../LogoContainer";
import miningImg from "../../assets/miningImg.jpg";
import { Registration } from "./Registration";

const backgroundStyle = {
  content: "''",
  background: `url(${miningImg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  filter: "blur(5px)", // Adjust the blur intensity (5px in this example)
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1, // Position the pseudo-element behind the content
};

export const SignInPage = () => {
  // const [action, setAction] = useState("login");
  // const handleAction = () => {
  //   if(action === "login") {
  //       setAction("register")
  //   } else {
  //       setAction("login")
  //   }
  // }


  return (
    <div className="loginPage relative min-h-full">
      <div style={backgroundStyle}></div>
      <div className="signUpFormContainer bg-white w-[30rem] h-fit rounded-2xl m-auto pb-6">
        <LogoContainer />
        <LoginForm />
        {/* {action === "login" ? <LoginForm /> : <Registration />} */}
        {/* <section className="text-center mt-4 pb-4 font-semibold text-base">
          <span className="text-gray-500">
            {
                action === "login" ?
                "Not a member?" :
                "Already have an account?"
            }
          </span>
          <span
            className="text-blue-700 cursor-pointer pl-2"
            onClick={handleAction}
          >
            {
                action === "login" ?
                "SignUp Now" :
                "Login"
            }
          </span>
        </section> */}
      </div>
    </div>
  );
};
