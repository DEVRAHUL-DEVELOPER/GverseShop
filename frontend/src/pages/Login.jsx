import React, { useState, useContext } from "react";
import Logo from "../assets/logo_gverseshop.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";
import validator from "validator";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase.js";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // ================= NORMAL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log(result.data);

      alert("Login successful");

    } catch (error) {
      console.log(error);

      if (error.response) {
        if (error.response.status === 404) {
          setError("User not found");
        } else if (error.response.status === 401) {
          setError("Invalid password");
        } else {
          setError(error.response.data?.message || "Login failed");
        }
      } else {
        setError("Server not responding");
      }
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
       const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        {
          name,email
        },
        { withCredentials: true }
      );

      console.log(result.data);

      alert("Google login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to login with Google");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex flex-col">

      {/* Navbar */}
      <div
        className="w-full h-[70px] flex items-center px-6 gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-[40px]" />
        <h1 className="text-white text-xl font-bold">GverseShop</h1>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-2xl shadow-2xl">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back
          </h2>

          {/* Google */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-white py-3 rounded-lg mb-5 hover:bg-gray-100"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-5">
            <div className="flex-grow border-t border-white/40"></div>
            <span className="mx-3 text-white text-sm">OR</span>
            <div className="flex-grow border-t border-white/40"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/80"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white/80"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
              Login
            </button>

            <p className="text-white text-center text-sm">
              Don't have an account?
              <span
                className="ml-1 font-semibold cursor-pointer"
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