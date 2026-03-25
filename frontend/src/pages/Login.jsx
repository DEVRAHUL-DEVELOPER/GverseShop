import React, { useState } from "react";
import Logo from "../assets/logo_gverseshop.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  
  const  {serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,password
      },{ withCredentials:true });
      console.log(result.data);


    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (

    <div className="w-screen h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex flex-col items-center">

      {/* Navbar */}
      <div
        className="w-full h-[80px] flex items-center px-8 gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-[45px]" />
        <h1 className="text-white text-2xl font-bold tracking-wide">
          GverseShop
        </h1>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center flex-grow w-full">

        <div className="w-[420px] backdrop-blur-lg bg-white/20 border border-white/30 p-10 rounded-2xl shadow-2xl">

          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Welcome Back
          </h2>

          {/* Email */}
          <form action="" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e)=>setEmail(e.target.value)} value={email}
         />

          {/* Password */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e)=>setPassword(e.target.value)} value={password}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300">
            Login
          </button>

          {/* Register Redirect */}
          <p className="text-white text-center mt-6">
            Don't have an account?{" "}
            <span
              className="font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>

        </form>
        </div>

      </div>

    </div>
  );
}

export default Login;