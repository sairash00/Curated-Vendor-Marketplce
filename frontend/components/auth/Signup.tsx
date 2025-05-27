import React from "react";

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
      <div
        className="
          relative
          z-10
          rounded-xl
          py-4 px-4
          w-[75%]
          max-w-md
          mx-4
          md:w-1/2
          md:max-w-none
          md:mx-0
          md:p-16
          sm:w-[80%]
          shadow-xl
          shadow-indigo-300/50
          md:shadow-none
        "
        style={{ minWidth: "300px" }}
      >
        <h2 className="text-4xl font-serif font-medium text-center mb-6">
          Sign up for an account
        </h2>

        <div className="space-y-8">
          <div className="relative">
            <label
              htmlFor="username"
              className="absolute bg-white px-2 text-gray-600 font-medium text-sm -top-3 left-3"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="John"
              className="border border-gray-300 rounded-md w-full px-3 py-3 placeholder-gray-400 focus:outline-none focus:border-black text-base bg-white"
              style={{ fontSize: "1rem" }}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="absolute bg-white px-2 text-gray-600 font-medium text-sm -top-3 left-3"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="123@ex.com"
              className="border border-gray-300 rounded-md w-full px-3 py-3 placeholder-gray-400 focus:outline-none focus:border-black text-base bg-white"
              style={{ fontSize: "1rem" }}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="absolute bg-white px-2 text-gray-600 font-medium text-sm -top-3 left-3"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md w-full px-3 py-3 placeholder-gray-400 focus:outline-none focus:border-black text-base bg-white"
              style={{ fontSize: "1rem" }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-4 text-xl font-medium transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
