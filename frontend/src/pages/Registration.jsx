import React, { useState, useContext } from "react";
import Logo from "../assets/logo_gverseshop.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/register`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex flex-col items-center">
      
      {/* Navbar */}
      <div
        className="w-full h-[70px] sm:h-[80px] flex items-center px-4 sm:px-8 gap-2 sm:gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-[35px] sm:w-[45px]" />
        <h1 className="text-white text-lg sm:text-2xl font-bold tracking-wide">
          GverseShop
        </h1>
      </div>

      {/* Registration Card */}
      <div className="flex items-center justify-center flex-grow w-full px-3 sm:px-0">
        <div className="w-[90%] sm:w-[420px] backdrop-blur-lg bg-white/20 border border-white/30 p-6 sm:p-10 rounded-2xl shadow-2xl flex flex-col items-center">
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Create Account
          </h2>

          <span className="text-white text-center mb-6 text-sm">
            Welcome to GverseShop, place your order
          </span>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-2.5 sm:py-3 rounded-lg mb-5 hover:bg-gray-100 transition">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center w-full mb-5">
            <div className="flex-grow border-t border-white/40"></div>
            <span className="mx-3 text-white text-sm">OR</span>
            <div className="flex-grow border-t border-white/40"></div>
          </div>

          {/* Form */}
          <form className="w-full" onSubmit={handleSignup}>
            
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 p-2.5 sm:p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full mb-4 p-2.5 sm:p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password */}
            <div className="w-full relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2.5 sm:p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <span
                className="absolute right-3 top-2.5 sm:top-3 cursor-pointer text-gray-600 text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full mb-6 p-2.5 sm:p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Register Button */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-300">
              Register
            </button>

            {/* Login Redirect */}
            <p className="text-white text-center mt-6 text-sm sm:text-base">
              Already have an account?{" "}
              <span
                className="font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Signin
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;