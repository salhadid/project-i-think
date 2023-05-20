import { useState } from "react";

function CreateProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
        const response = await fetch("http://localhost:8000/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
        body: JSON.stringify({
            title,
            description,
        }),
        });

        const project = await response.json();

        console.log(project);

        setIsLoading(false);
        setTitle("");
        setDescription("");
        setIsSuccess(true);
    };

    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-4">Create Project</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
                >
                Title
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
                >
                Description
                </label>
                <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Enter project description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                ></textarea>
            </div>
            <div className="flex items-center justify-between">
                <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isLoading && "opacity-50 cursor-wait"
                }`}
                type="submit"
                disabled={isLoading}
                >
                {isLoading ? "Creating..." : "Create"}
                </button>
            </div>
            </form>
            {isSuccess && (
            <div
                className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                role="alert"
            >
                <p className="font-bold">Project created successfully!</p>
                <p>Title: {title}</p>
                <p>Description: {description}</p>
            </div>
            )}
        </div>
        </div>
    );
}

export default CreateProject;
