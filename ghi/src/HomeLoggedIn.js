import React, { useState, useEffect } from "react";
import axios from "axios";

function HomeLoggedIn() {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [collaborations, setCollaborations] = useState([]);

    useEffect(() => {
        // Fetch user data
        axios
        .get(`http://localhost:8000/api/accounts/details`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            const userData = response.data;
            setUser(userData);
        })
        .catch((error) => {
            alert(`Error fetching user data: ${error}`);
        });

        // Fetch projects
        axios
        .get(`http://localhost:8000/api/projects/list/`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            const projectData = response.data;
            setProjects(projectData); // Assuming the response is an array of objects
        })
        .catch((error) => {
            alert(`Error fetching projects: ${error}`);
        });


        // Fetch collaborations
        axios
        .get(`http://localhost:8000/api/collaborations`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            const collaborationData = response.data;
            setCollaborations(collaborationData);
        })
        .catch((error) => {
            alert(`Error fetching collaborations: ${error}`);
        });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                <div className="flex-shrink-0">
                    <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    <span className="text-gray-600 font-medium mr-4">
                        Welcome, {user.full_name}!
                    </span>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                        onClick={() => {
                        // Log out user
                        localStorage.removeItem("token");
                        window.location.reload();
                        }}
                    >
                        Log Out
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="flex flex-wrap -mx-4 mb-8">
                <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                    <div className="bg-white rounded-lg shadow p-6 h-full">
                    <h2 className="text-lg font-bold mb-4">My Projects</h2>
                    {projects.length > 0 ? (
                        <ul>
                        {projects.map((project) => (
                            <li key={project.id} className="mb-2">
                            <a
                                href={`http://localhost:8000/projects/list/${project.id}/`}
                                className="text-blue-500 hover:underline"
                            >
                                {project.title}{" "}
                                {/* Update the property name to 'title' */}
                            </a>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>No projects found.</p>
                    )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                    <div className="bg-white rounded-lg shadow p-6 h-full">
                    <h2 className="text-lg font-bold mb-4">My Collaborations</h2>
                    {collaborations.length > 0 ? (
                        <ul>
                        {collaborations.map((collaboration) => (
                            <li key={collaboration.id} className="mb-2">
                            <a
                                href={`/projects/${collaboration.project.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {collaboration.project.name}
                            </a>{" "}
                            - {collaboration.role}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>No collaborations found.</p>
                    )}
                    </div>
                </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4">Other Information</h2>
                <p>Insert other important information here.</p>
                </div>
            </div>
            </main>
        </div>
        );
}

export default HomeLoggedIn;
