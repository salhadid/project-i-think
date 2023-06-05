import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [zipCode, setZipCode] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const navigate = useNavigate();

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=af7010de2b41cd014ba07badea295211&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    const convertToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    const links = loggedIn
        ? [
            { to: "/", text: "Home" },
            { to: "/ai", text: "AI" },
            { to: "/update", text: "Update Account" },
            { to: "/create/project", text: "Create Project" },
            { to: "/voting", text: "Voting" },
            { to: "/projectForm", text: "Project Form" },
            { to: "/VisionBoard", text: "Vision Board" },
            { to: "/ImageList", text: "Image List" },
            { to: "/editResponses", text: "Edit Responses" },
            { to: "/contact", text: "Contact" },
            { text: "Logout", onClick: handleLogout },
        ]
    : [
            { to: "/register", text: "Create Account" },
            { to: "/contact", text: "Contact" },
            { to: "/login", text: "Log In" },
        ];

    return (
        <header
            className="bg-gradient-to-r from-purple-900 to-black shadow z-50 fixed w-full"
            style={{ top: 0 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/">
                            <h1 className="text-2xl font-bold text-gray-300">
                                iThink
                            </h1>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center mr-4"
                        >
                            <label
                                htmlFor="zipCode"
                                className="text-gray-300 mr-2"
                            >
                                Zip Code:
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="border rounded px-2 py-1 w-24 text-black"
                            />
                            <button
                                type="submit"
                                className="ml-2 bg-dark hover:bg-grey text-white font-bold py-1 px-2 rounded"
                            >
                                Fetch
                            </button>
                        </form>
                        {weatherData && (
                            <div className="flex items-center text-gray-300">
                                <img
                                    src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                                    alt="weather icon"
                                    className="w-6 h-6 mr-2"
                                />
                                <div className="mr-4">
                                    <p className="text-lg font-bold">
                                        {Math.round(
                                            convertToFahrenheit(
                                                weatherData.main.temp
                                            )
                                        )}
                                        °F
                                    </p>
                                    <p>{weatherData.weather[0].description}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block text-left">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300"
                        >
                            Menu
                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 6a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 114 0 2 2 0 01-4 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {showMenu && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    {links.map((link, index) =>
                                        link.onClick ? (
                                            <button
                                                key={index}
                                                onClick={link.onClick}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                {link.text}
                                            </button>
                                        ) : (
                                            <Link
                                                key={index}
                                                to={link.to}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                {link.text}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
