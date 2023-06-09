import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProjectForm() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await axios.get(
                    `${process.env.REACT_APP_iThink}/api/projects/list`
                );
                setProjects(projectsResponse.data);

                const usersResponse = await axios.get(
                    `${process.env.REACT_APP_iThink}/api/accounts`
                );
                setUsers(usersResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error occurred while fetching data.");
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                `${process.env.REACT_APP_iThink}/api/projects/${selectedProject}/assign?user_id=${selectedUser}&role=${role}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess("Successfully assigned user to the project.");
            setError("");
            setSelectedProject("");
            setSelectedUser("");
            setRole("");
            toast.success("Woohoo! You added a a member! Now get to work! 💻");
        } catch (error) {
            console.error(
                "Server responded with an error:",
                error.response.data
            );
            setError(
                error.response.data.detail ||
                    "An error occurred while assigning the user to the project."
            );
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <ToastContainer />
            <form
                className="bg-white p-8 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl mb-4">Add Member to Project</h2>

                <select
                    className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.title}
                        </option>
                    ))}
                </select>

                <select
                    className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </select>

                <input
                    className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                    required
                />

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {success && <p className="text-green-500 mb-4">{success}</p>}

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    type="submit"
                >
                    Assign
                </button>
            </form>
        </div>
    );
}

export default ProjectForm;
