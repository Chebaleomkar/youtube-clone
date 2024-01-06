import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextApi";
  import YtLogo from "../images/yt-logo.png";

const Success = () => {
  const { premiumUser, setPremiumUser } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r  from-red-700 to-white text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Congratulations!</h1>
        <img src="https://www.gstatic.com/youtube/img/promos/growth/ytr_lp2_logo_premium_desktop_552x71.png" alt="premium" />

      <p className="text-xl md:text-2xl mb-4">
        You are now a <span className="text-yellow-300">Premium Member</span>!
      </p>
      <p className="text-lg md:text-xl">
        Thank you for choosing our premium plan. Enjoy exclusive benefits and
        features!
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 text-lg md:text-xl bg-yellow-300 text-red-700 rounded-full hover:bg-green-400 transition duration-300 ease-in-out"
      >
        Home
      </button>
    </div>
  );
};

export default Success;
