import React from "react";

const LogOut = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogOut;
