import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(token !== null);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        alert("User was logged out successfully");
        setLoggedIn(false);
        navigate("/");
        window.location.reload();
    };


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const links = loggedIn
        ? [
            { to: "/", text: "Home" },
            { to: "/ai", text: "AI" },
            { to: "/WeatherWidget", text: "Weather!" },
            { to: "/update", text: "Update Account" },
            { text: "Logout", onClick: handleLogout },
        ]
        : [
            { to: "/register", text: "Create Account" },
            { to: "/login", text: "Log In" },
        ];

    return (
        <header className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            <div className="flex items-center">
                <Link to="/">
                <h1 className="text-2xl font-bold text-white">iThink</h1>
                </Link>
            </div>
            <nav className="hidden sm:flex sm:items-center">
                {links.map((link, index) =>
                link.onClick ? (
                    <button
                    key={index}
                    onClick={link.onClick}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
                    >
                    {link.text}
                    </button>
                ) : (
                    <Link
                    key={index}
                    to={link.to}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
                    >
                    {link.text}
                    </Link>
                )
                )}
            </nav>
            <div className="-mr-2 flex items-center sm:hidden">
                <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                >
                {/* Icon when menu is closed. */}
                <svg
                    className={`${showMenu ? "hidden" : "block"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                {/* Icon when menu is open. */}
                <svg
                    className={`${showMenu ? "block" : "hidden"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>
            </div>
        </div>
        {showMenu && (
            <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {links.map((link, index) =>
                link.onClick ? (
                    <button
                    key={index}
                    onClick={link.onClick}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
                    >
                    {link.text}
                    </button>
                ) : (
                    <Link
                    key={index}
                    to={link.to}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
                    >
                    {link.text}
                    </Link>
                )
                )}
            </div>
            </div>
        )}
        </header>
    );
};

export default NavBar;
