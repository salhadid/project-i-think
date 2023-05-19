import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
        // Refresh the page after successful login
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

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div style={{ color: "red" }}>{errorMessage}</div>
        <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;