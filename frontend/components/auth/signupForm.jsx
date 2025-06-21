'use client'

import React,{useState} from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query';
import showToast from '@/utils/toast';
import { useRouter } from 'next/navigation';


const SignupForm = () => {
  const router = useRouter();
    const [ data, setData] = useState({
    name: "",
    email: "",
    address: "" ,
    password: ""
  })

  const handleChange = (e) => { 
  const { name, value } = e.target;
  // Prevent non-numeric input for phone
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      setData({ ...data, [name]: onlyNums });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const registerUser = async (data) => {
    const response = await axios.post("http://localhost:3001/api/v1/user/register", data)
    return response.data;
  }

  const {mutate, isLoading} = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      showToast("success", data.message);
      router.push("/main/vendors")
    },
    onError: (error) => {
      console.log(error)
      if (error.response && error.response.data) {
        showToast("error", "error.response.data.message");
      } else {
        showToast("error", "User registration failed");
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.address || !data.phone) {
      showToast("error", "Empty fields");
      return;
    }
    mutate(data);
    setData({
      name: "",
      email: "",
      phone: null,
      address: "",
      password: ""
    })
  }

  return (
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
        <h2 className="text-4xl font-semibold text-indigo-600 text-center mb-6">
          Sign up to Mercado
        </h2>
      <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
                <label
                  htmlFor="username"
                  className="absolute bg-white px-2 text-gray-600 font-medium text-sm -top-3 left-3"
                >
                  Name
                </label>
                <input
                  id="username"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value = {data.name}
                  type="text"
                  placeholder="Jose Mourinho"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-400 text-base bg-white"
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
                  value = {data.email}
                  onChange={(e) => handleChange(e)}
                  type="email"
                  placeholder="guardiola@pep.com"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-400 text-base bg-white"
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
                  value = {data.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-400 text-base bg-white"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="address"
                  className="absolute bg-white px-2 text-gray-600 font-medium text-sm -top-3 left-3"
                >
                  Address
                </label>
                <input
                  id="address"
                  onChange={(e) => handleChange(e)}
                  value = {data.address}
                  name="address"
                  type="text"
                  placeholder="Place, Municipality, District"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-400 text-base bg-white"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="phone"
                  className="absolute bg-white px-2 text-gray-600 font-medium text-sm -top-3 left-3"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  value = {data.phone}
                  type="text"
                  placeholder="+977 9800000000"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-400 text-base bg-white"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-xl font-medium transition duration-200"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
          </div>
      </form>
      </div>
  )
}

export default SignupForm