import { useState } from "react";

function Voting() {
    const [responses, setResponses] = useState([
        { id: 1, text: "Sample response 1", votes: 0 },
        { id: 2, text: "Sample response 2", votes: 0 },
        { id: 3, text: "Sample response 3", votes: 0 },
        { id: 4, text: "Sample response 4", votes: 0 },
    ]);

    const [projectResponses, setProjectResponses] = useState([]);

    const handleVote = (responseId, voteType) => {
        const updatedResponses = responses.map((response) => {
        if (response.id === responseId) {
            if (voteType === "up") {
            return { ...response, votes: response.votes + 1 };
            } else if (voteType === "down") {
            return { ...response, votes: response.votes - 1 };
            }
        }
        return response;
        });

        setResponses(updatedResponses);
    };

    const handleDrop = (event, projectId) => {
        event.preventDefault();
        const responseId = event.dataTransfer.getData("responseId");
        const response = responses.find(
        (response) => response.id === parseInt(responseId)
        );
        if (response) {
        const updatedResponses = responses.filter(
            (response) => response.id !== parseInt(responseId)
        );
        setResponses(updatedResponses);
        const updatedProjectResponses = [
            ...projectResponses,
            { ...response, projectId },
        ];
        setProjectResponses(updatedProjectResponses);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-4">Voting</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <h2 className="text-lg font-bold mb-2">Responses</h2>
                <ul>
                {responses.map((response) => (
                    <li
                    key={response.id}
                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg mb-2"
                    draggable
                    onDragStart={(event) =>
                        event.dataTransfer.setData("responseId", response.id)
                    }
                    >
                    <span>{response.text}</span>
                    <div>
                        <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleVote(response.id, "up")}
                        >
                        +
                        </button>
                        <span className="mx-2">{response.votes}</span>
                        <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleVote(response.id, "down")}
                        >
                        -
                        </button>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2">Project Columns</h2>
                <ul>
                <li
                    className="bg-gray-200 px-4 py-2 rounded-lg mb-2"
                    onDrop={(event) => handleDrop(event, 1)}
                    onDragOver={handleDragOver}
                >
                    <h3 className="font-bold mb-2">Column 1</h3>
                    <ul>
                    {projectResponses
                        .filter((response) => response.projectId === 1)
                        .map((response) => (
                        <li
                            key={response.id}
                            className="flex items-center justify-between"
                        >
                            <span>{response.text}</span>
                            <span>{response.votes}</span>
                        </li>
                        ))}
                    </ul>
                </li>
                <li
                    className="bg-gray-200 px-4 py-2 rounded-lg mb-2"
                    onDrop={(event) => handleDrop(event, 2)}
                    onDragOver={handleDragOver}
                >
                    <h3 className="font-bold mb-2">Column 2</h3>
                    <ul>
                    {projectResponses
                        .filter((response) => response.projectId === 2)
                        .map((response) => (
                        <li
                            key={response.id}
                            className="flex items-center justify-between"
                        >
                            <span>{response.text}</span>
                            <span>{response.votes}</span>
                        </li>
                        ))}
                    </ul>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Voting;
