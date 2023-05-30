import React from "react";

const LogOut = () => {
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        alert("User was logged out successfully");

        window.location.reload();
    };

    // If there's no token in the local storage, don't show the Logout button.
    if (!token) {
        return null;
    }

    return (
        <button
        onClick={handleLogout}
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
        >
        Logout
        </button>
    );
};

export default LogOut;
