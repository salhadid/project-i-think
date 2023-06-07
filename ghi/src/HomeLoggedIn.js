import React, { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "./static/hero-ithink.png";

function HomeLoggedIn() {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Fetch user data
        axios
            .get(`${process.env.REACT_APP_iThink}/api/accounts/details`, {
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
            .get(`${process.env.REACT_APP_iThink}/api/projects/list`, {
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

        // Fetch images
        axios
            .get(`${process.env.REACT_APP_iThink}/api/images/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                const imageData = response.data;
                setImages(imageData);
            })
            .catch((error) => {
                alert(`Error fetching images: ${error}`);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const handleDeleteProject = (projectId) => {
        axios
            .delete(
                `${process.env.REACT_APP_iThink}api/projects/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((response) => {
                alert(`Project deleted successfully`);
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project.id !== projectId)
                );
            })
            .catch((error) => {
                alert(`Error deleting project: ${error}`);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen pt-20">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 pt-150 pt-25">
                        <div className="flex-shrink-0">
                            <img
                                src={heroImage}
                                alt="iThink"
                                className="w-16 h-16"
                            />
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
                                    Log Out ✌️
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150 ml-4"
                                    onClick={() => {
                                        window.location.href =
                                            "http://localhost:3000/create/project";
                                    }}
                                >
                                    Add a new project ➕
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150 ml-4"
                                    onClick={() => {
                                        window.location.href =
                                            "http://localhost:3000/editResponses";
                                    }}
                                >
                                    Edit Responses 📝
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
                                <h2 className="text-lg font-bold mb-4">
                                    My Projects
                                </h2>
                                {projects.length > 0 ? (
                                    <ul>
                                        {projects.map((project) => (
                                            <li
                                                key={project.id}
                                                className="mb-2 flex items-center justify-between"
                                            >
                                                <a
                                                    href={`${process.env.REACT_APP_iThink}/projects/list/${project.id}`}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {project.title}{" "}
                                                    {/* Update the property name to 'title' */}
                                                </a>
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() =>
                                                        handleDeleteProject(
                                                            project.id
                                                        )
                                                    }
                                                >
                                                    ❌
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No projects found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4">Images</h2>
                        {images.length > 0 ? (
                            <div className="flex justify-center items-center">
                                <img
                                    src={`${process.env.REACT_APP_iThink}/api/images/${images[currentImageIndex].filename}`}
                                    alt={images[currentImageIndex].filename}
                                />
                            </div>
                        ) : (
                            <p>No images found.</p>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4">
                            Other Information
                        </h2>
                        <p>Insert other important information here.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomeLoggedIn;
