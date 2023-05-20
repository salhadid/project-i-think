import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch user account data
    axios
      .get(`http://localhost:8000/api/accounts/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        setEmail(userData.email);
        setFullName(userData.full_name);
      })
      .catch((error) => {
        alert(`Error fetching account data: ${error}`);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Build data object
    const data = {};
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = password;
    }
    if (fullName) {
      data.full_name = fullName;
    }

    // Send PATCH request
    axios
      .patch(`http://localhost:8000/api/accounts/${email}`, data)
      .then((response) => {
        alert("Account updated successfully!");
        // Clear form fields
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        alert(`Error updating account: ${error}`);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            disabled
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-700"
          >
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block mb-2 font-bold text-gray-700"
          >
            Confirm Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="full_name"
            className="block mb-2 font-bold text-gray-700"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Update Account
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
