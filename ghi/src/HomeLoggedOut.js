import React from "react";
import { Link } from "react-router-dom";
import AIChat from "./AIChat";

const HomeLoggedOut = () => {
    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white justify-center items-center space-y-8">
        <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold">Welcome to iThink</h1>
            <p className="text-2xl max-w-lg">
            iThink is the best brainstorming app on the market. It's powered by AI
            for optimal collaboration and boasts an intuitive user interface, plus
            excellent team management features.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
                <button className="px-8 py-3 text-lg font-semibold rounded-full bg-white text-purple-800 hover:bg-gray-200 transition-colors duration-300">
                Sign Up
                </button>
            </Link>
            <Link to="/login">
                <button className="px-8 py-3 text-lg font-semibold rounded-full border border-white hover:bg-white hover:text-purple-800 transition-colors duration-300">
                Login
                </button>
            </Link>
            </div>
        </div>
        <div className="bg-white p-2 rounded-xl text-black max-w-2xl w-full">
            <div className="h-96 overflow-y-auto">
            <AIChat />
            </div>
        </div>
        </div>
    );
};

export default HomeLoggedOut;
