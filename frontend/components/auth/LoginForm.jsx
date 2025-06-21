'use client'

import React,{useState} from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query';
import showToast from '@/utils/toast';
import { useRouter } from 'next/navigation';


const SignupForm = () => {
  const router = useRouter();
    const [ data, setData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => { 
  const { name, value } = e.target;
    setData({
        ...data,
        [name]: value
    })
  };


  const loginUser = async (data) => {
    const response = await axios.post("http://localhost:3001/api/v1/user/login", data);
    return response.data
  }

  const {mutate, isLoading} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
        showToast("success", "User logged in successfully");
        router.push("/main/vendors")
    },
    onError: (error) => {
        if(error.response && error.response.data){
            showToast("error", error.response.data.message);
        }else{
            showToast("error", "User login failed")
        }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!data.email || !data.password){
        showToast("error", "Missing Fields");
        return;
    };
    mutate(data);
    setData({
      email: "",
      password: ""
    });
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
          Sign In to Mercado
        </h2>
      <form onSubmit={handleSubmit}>
          <div className="space-y-6">
           
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