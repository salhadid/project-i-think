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

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogOut;
