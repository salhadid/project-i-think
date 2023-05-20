import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            "http://localhost:8000/token",
            `grant_type=password&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
            {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
            }
        );
        localStorage.setItem("token", response.data.access_token);
        console.log("Logged in successfully");
        alert(`User ${email} was logged in successfully`);
        // Navigate to home page and refresh
        navigate("/");
        window.location.reload();
        resetForm();
        } catch (error) {
        console.error(error.response.data);
        setErrorMessage(
            "Incorrect email or password. Are you sure you're a human?"
        );
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setErrorMessage("");
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <animated.form
        style={fadeIn}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md"
        >
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
            </label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
            >
            Password:
            </label>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            />
            <label
                htmlFor="show-password"
                className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer"
            >
                <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={handleShowPassword}
                className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700 font-medium">
                Show Password
                </span>
            </label>
            </div>
        </div>
        <div style={{ color: "red" }} className="mb-4">
            {errorMessage}
        </div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Login
        </button>
        </animated.form>
    );
};

export default LoginForm;
