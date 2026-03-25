import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo_gverseshop.png";

function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/signup");
    }, 3000);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500">

      <img src={Logo} alt="logo" className="w-[90px] mb-6 animate-bounce" />

      <div className="w-[60px] h-[60px] border-4 border-white border-t-transparent rounded-full animate-spin"></div>

      <p className="text-white mt-6 text-lg font-semibold">
        Welcome to GverseShop...
      </p>

    </div>
  );
}

export default Home;