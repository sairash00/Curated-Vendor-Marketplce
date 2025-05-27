import React from "react";
import SignupForm from '@components/auth/signupForm'
const Signup = () => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden">
      {/* IMAGE SECTION */}
      {/* Desktop: image side by side */}
      <div className="hidden md:flex w-1/2 h-screen justify-center items-center">
        <img
          src="/shopping.png"
          alt="Side"
          className="max-h-[90vh] object-contain"
        />
      </div>
      {/* FORM SECTION */}
      <SignupForm />
    </div>
  );
};

export default Signup;
