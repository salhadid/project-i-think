import React, { useState } from "react";
import axios from "axios";

const AddUserForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isRobot, setIsRobot] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
        }
        if (isRobot) {
        alert("Sorry, robots are not allowed to create accounts!");
        return;
        }
        try {
        const response = await axios.post("http://localhost:8000/api/accounts", {
            email,
            password,
            full_name: full_name,
        });
        console.log(response.data);
        resetForm();
        alert(`Congratulations, account was successfully created!`);
        } catch (error) {
        console.log(error.response.data);
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
        setIsRobot(false);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCaptchaChange = () => {
        setIsRobot(Math.random() < 0.5);
    };

    return (
        <form
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
        <div className="mb-4">
            <label
            htmlFor="confirm-password"
            className="block text-gray-700 font-bold mb-2"
            >
            Confirm Password:
            </label>
            <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="full_name"
            className="block text-gray-700 font-bold mb-2"
            >
            Full Name:
            </label>
            <input
            type="text"
            id="full_name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="robot" className="block text-gray-700 font-bold mb-2">
            Are you a robot?
            </label>
            <div className="flex items-center">
            <input
                type="radio"
                id="robot-yes"
                name="robot"
                value="yes"
                checked={isRobot}
                onChange={() => setIsRobot(true)}
                className="form-radio h-5 w-5 text-gray-600"
            />
            <label htmlFor="robot-yes" className="ml-2">
                Yes
            </label>
            </div>
            <div className="flex items-center">
            <input
                type="radio"
                id="robot-no"
                name="robot"
                value="no"
                checked={!isRobot}
                onChange={() => setIsRobot(false)}
                className="form-radio h-5 w-5 text-gray-600"
            />
            <label htmlFor="robot-no" className="ml-2">
                No
            </label>
            </div>
        </div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isRobot}
        >
            Add User
        </button>
        </form>
    );
};

export default AddUserForm;
