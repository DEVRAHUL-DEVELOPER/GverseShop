import React, { useState, useContext } from "react";
import Logo from "../assets/logo_gverseshop.png";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log(result.data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex flex-col">

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

      {/* Center Section */}
      <div className="flex flex-1 items-center justify-center px-4 py-6 sm:py-10">

        {/* Card */}
        <div className="w-full max-w-md lg:max-w-lg backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl px-6 sm:px-10 py-8 sm:py-12">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8">
            Welcome Back
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2.5 sm:p-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password */}
            <div className="relative">
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

            {/* Login Button */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-300 mt-2">
              Login
            </button>

            {/* Register Redirect */}
            <p className="text-white text-center mt-4 text-sm sm:text-base">
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