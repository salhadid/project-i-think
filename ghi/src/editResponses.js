import React, { useState, useEffect } from "react";
import axios from "axios";

function EditResponses() {
    const [responses, setResponses] = useState([]);
    const [newResponse, setNewResponse] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await axios.get(
                    `${process.env.REACT_APP_iThink}/api/projects/list`
                );
                setProjects(result.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchResponses = async () => {
            if (selectedProject) {
                try {
                    const result = await axios.get(
                        `${process.env.REACT_APP_iThink}/api/projects/${selectedProject.id}`
                    );
                    setResponses(result.data.responses);
                } catch (error) {
                    console.error("Error fetching responses:", error);
                }
            }
        };
        fetchResponses();
    }, [selectedProject]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedProject === null) {
            console.error("No project selected");
            return;
        }

        if (newResponse.trim() === "") {
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_iThink}/api/projects/${selectedProject.id}/add_response`,
                newResponse,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (
                typeof response.data === "object" &&
                response.data.hasOwnProperty("message")
            ) {
                setResponses([...responses, response.data.message]);
            } else {
                setResponses([...responses, response.data]);
            }
            setNewResponse("");
        } catch (error) {
            console.error("Error adding response:", error);
        }
    };

    const handleProjectChange = (event) => {
        const projectId = event.target.value;
        const selected = projects.find((project) => project.id === projectId);
        setSelectedProject(selected);
    };

    const handleDelete = async (response) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_iThink}/api/projects${
                    selectedProject.id
                }/remove_idea/${response}?response=${encodeURIComponent(
                    response
                )}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setResponses(responses.filter((item) => item !== response));
        } catch (error) {
            console.error("Error deleting response:", error);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-purple-900 via-violet-500 to-blue-300 h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-center text-4xl text-blue-600 font-bold mb-8 font-sans">
                    Responses
                </h1>
                <hr className="mb-6"></hr>
                <div className="flex items-center font-medium justify-center text-lg mb-8">
                    <select
                        className="text-center text-sky-400 font-semibold"
                        onChange={handleProjectChange}
                    >
                        <option value="">Please select a project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-center gap-2">
                    {responses &&
                        responses.map((response, index) => (
                            <div
                                key={index}
                                className="flex items-center w-full mb-2"
                            >
                                <div className="flex-grow font-light font-sans">
                                    {response}
                                </div>
                                <button onClick={() => handleDelete(response)}>
                                    ❌
                                </button>
                            </div>
                        ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center mt-5 mb-4">
                        <input
                            type="text"
                            value={newResponse}
                            onChange={(event) =>
                                setNewResponse(event.target.value)
                            }
                            placeholder="Add custom response..."
                            className="border rounded-l px-1 py-1 flex-1"
                        />
                        <button type="submit" className="ml-4">
                            ✅
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditResponses;
