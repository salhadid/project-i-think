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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        Logout
        </button>
    );
};

export default LogOut;

// import React from "react";

// const LogOut = () => {
//     const token = localStorage.getItem("token");

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         console.log("Logged out successfully");
//         alert("User was logged out successfully");

//         window.location.reload();
//     };

//     // If there's no token in the local storage, don't show the Logout button.
//     if (!token) {
//         return null;
//     }

//     return <button onClick={handleLogout}>Logout</button>;
// };

// export default LogOut;
