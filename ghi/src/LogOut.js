import React from "react";

const LogOut = () => {
    const handleLogout = () => {
        const token = localStorage.getItem("token");
        if (!token) {
        alert("Don't be silly. You've got to be logged in to log out.");
        return;
        }
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        alert("User was logged out successfully");
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogOut;
