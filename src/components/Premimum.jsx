import React, { useContext, useState } from "react";
import { MdMarkAsUnread, MdOutlinePayment } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { Context } from "../context/ContextApi";
import { categories } from "../utils/Constatnts";
import axios from "axios";

const Premium = () => {
  const { premiumUser, setPremiumUser } = useContext(Context);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [email  , setEmail] = useState();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePlanClick = (value) => {
    setSelectedOption(value);
  };

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    setLoading(true);

    try {
      if (!selectedOption) {
        alert("Please select a premium plan before proceeding to checkout.");
        setLoading(false);
        return;
      }
      const EmailAddress = prompt("Please enter Email ");
      setEmail(EmailAddress);
      console.log(email);

      const response = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              name: "Premium Plan",
              price: selectedOption,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      setPremiumUser(true);
      await sendEmail(email);
      if (response.ok) {
        const sessionId = data.sessionId;

        if (!sessionId) {
          console.error("Error: No session ID received from the server.");
          return;
        }

        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error(result.error.message);
          // Handle payment failure
        }
      } else {
        console.error(`Error: ${data.error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const sendEmail = async(emailAdd) =>{
    try{
        const req = axios.post('http://localhost:8000/api/email' , {emailAdd , selectedOption })
    }catch(err){
      console.log('Error in sending Email : ' , err)
    }
  }

  return (
    <div className="h-full  bg-gradient-to-r from-black to-white ">
      <div className=" container mx-auto mt-8 md:mt-16 h-auto md:h-[500px] p-8 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-blue-700 text-white">
        <div className=" flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 md:mb-0">
            Choose a Premium Plan:
          </h2>
          <button
            className={` flex items-center text-lg md:text-xl  bg-yellow-500 hover:bg-yellow-400 text-gray-900 py-2 px-4 rounded-md transition duration-300 ease-in-out ${
              loading ? "cursor-not-allowed" : ""
            }`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading && <span className="mr-2 animate-spin">🔄</span>}
            <MdOutlinePayment size={20} className="mr-2" /> Be Premium
          </button>
        </div>
        <div className="grid h-[200px] text-center grid-cols-1 md:grid-cols-3 gap-4">
          {/* First Plan */}
          <div
            className="flex flex-col border-red-400 border p-4 cursor-pointer"
            onClick={() => handlePlanClick("1290")}
          >
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="radio"
                value="1290"
                checked={selectedOption === "1290"}
                onChange={handleOptionChange}
                className="form-radio text-blue-500"
              />
              <span className="text-lg md:text-xl font-semibold">
                12 months
              </span>
            </label>
            <p className="text-sm md:text-base">
              Save big with our annual plan!
            </p>
          </div>

          {/* Second Plan */}
          <div
            className="flex flex-col border-red-400 border p-4 cursor-pointer"
            onClick={() => handlePlanClick("399")}
          >
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="radio"
                value="399"
                checked={selectedOption === "399"}
                onChange={handleOptionChange}
                className="form-radio text-blue-500"
              />
              <span className="text-lg md:text-xl font-semibold">3 months</span>
            </label>
            <p className="text-sm md:text-base">Flexible plan.</p>
          </div>

          {/* Third Plan */}
          <div
            className="flex flex-col border-red-400 border p-4 cursor-pointer"
            onClick={() => handlePlanClick("139")}
          >
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="radio"
                value="139"
                checked={selectedOption === "139"}
                onChange={handleOptionChange}
                className="form-radio text-blue-500"
              />
              <span className="text-lg md:text-xl font-semibold">1 month</span>
            </label>
            <p className="text-sm md:text-base">Try us out for a month.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
