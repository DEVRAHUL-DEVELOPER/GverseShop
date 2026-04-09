import React, { useState, useContext } from "react";
import Logo from "../assets/logo_gverseshop.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase.js";
import Dashboard from "./Dashboard.jsx";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      console.log(result.data);

      alert("Registration successful");

    } catch (error) {
      console.log(error);

      if (error.response) {
        if (error.response.status === 409) {
          setError("User already exists");
        } else {
          setError(error.response.data?.message || "Something went wrong");
        }
      } else {
        setError("Server not responding");
      }
    }
  };

  // ================= GOOGLE SIGNUP ================= //
  const handleGoogleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
    const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        {
          name, email
        },
        { withCredentials: true }
      );

      console.log(result.data);

      alert("Google signup successful");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Google signup error:", error);
      setError("Failed to signup with Google");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex flex-col items-center">

      {/* Navbar */}
      <div
        className="w-full h-[70px] flex items-center px-6 gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-[40px]" />
        <h1 className="text-white text-xl font-bold">GverseShop</h1>
      </div>

      {/* Card */}
      <div className="flex items-center justify-center flex-grow w-full px-4">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-2xl shadow-2xl">

          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Create Account
          </h2>

          {/* Google */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-white py-3 rounded-lg mb-5 hover:bg-gray-100"
            onClick={handleGoogleSignup}
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
          <form onSubmit={handleSignup} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-white/80"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

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

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/80"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
              Register
            </button>

            <p className="text-white text-center text-sm">
              Already have an account?
              <span
                className="ml-1 font-semibold cursor-pointer"
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