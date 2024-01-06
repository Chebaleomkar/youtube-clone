import React from 'react';
import { MdCancel } from 'react-icons/md';
import { IoArrowRedo } from 'react-icons/io5';
import { MdHomeFilled } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 flex items-center">
        <MdCancel size={40} className="mr-2" /> Payment Cancelled
      </h1>
      <p className="text-xl md:text-2xl mb-4">
        Your payment has been cancelled. If you have any issues, please try again or contact support.
      </p>
      <button
        className="mt-8 px-6 py-3 text-lg md:text-xl bg-yellow-300 text-purple-700 rounded-full hover:bg-orange-500 transition duration-300 ease-in-out flex items-center"
        onClick={() => navigate('/')}
      >
        <MdHomeFilled className="mr-2" /> HOME
      </button>
      <button
        className="mt-8 px-6 py-3 text-lg md:text-xl bg-yellow-300 text-green-700 rounded-full hover:bg-green-400 transition duration-300 ease-in-out flex items-center"
        onClick={() => navigate('/premium')}
      >
        <IoArrowRedo className="mr-2" /> Try again
      </button>
     
    </div>
  );
};

export default Cancel;
