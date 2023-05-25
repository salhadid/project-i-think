import React, { useState } from "react";

function Voting() {
    const [responses, setResponses] = useState([
        { id: 1, text: "Sample response 1", votes: 0 },
        { id: 2, text: "Sample response 2", votes: 0 },
        { id: 3, text: "Sample response 3", votes: 0 },
        { id: 4, text: "Sample response 4", votes: 0 },
    ]);

    const [collaborationColumns, setCollaborationColumns] = useState([
        { id: 1, name: "Column 1", responses: [] },
        { id: 2, name: "Column 2", responses: [] },
    ]);

    const handleVote = (responseId, voteType) => {
        const updatedResponses = responses.map((response) => {
        if (response.id === responseId) {
            return {
            ...response,
            votes: voteType === "up" ? response.votes + 1 : response.votes - 1,
            };
        }
        return response;
        });

        setResponses(updatedResponses);
    };

    const handleMoveToCollaboration = (responseId, columnId) => {
        const response = responses.find((response) => response.id === responseId);
        if (!response) return;

        // remove response from current list
        const updatedResponses = responses.filter(
        (response) => response.id !== responseId
        );
        setResponses(updatedResponses);

        // add response to collaboration column
        const updatedColumns = collaborationColumns.map((column) => {
        if (column.id === columnId) {
            return { ...column, responses: [...column.responses, response] };
        }
        return column;
        });
        setCollaborationColumns(updatedColumns);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="max-w-7xl w-full mx-4 md:mx-0 bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
            Community Voting
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                {responses.map((response) => (
                <div
                    key={response.id}
                    className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
                >
                    <span className="font-medium text-lg mb-4 md:mb-0">
                    {response.text}
                    </span>
                    <div className="flex items-center">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline mr-2"
                        onClick={() => handleVote(response.id, "up")}
                    >
                        Upvote
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline mr-2"
                        onClick={() => handleVote(response.id, "down")}
                    >
                        Downvote
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                        onClick={() => handleMoveToCollaboration(response.id, 1)}
                    >
                        Move to Collaboration
                    </button>
                    <span className="font-semibold text-xl ml-4">
                        {response.votes}
                    </span>
                    </div>
                </div>
                ))}
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center">
                Collaboration Columns
                </h2>
                {collaborationColumns.map((column) => (
                <div key={column.id} className="bg-gray-200 p-4 rounded-lg mb-4">
                    <h3 className="font-bold mb-4">{column.name}</h3>
                    <ul>
                    {column.responses.map((response) => (
                        <li
                        key={response.id}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2"
                        >
                        <span>{response.text}</span>
                        <span>{response.votes}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}

export default Voting;









// import { useState } from "react";

// function Voting() {
//     const [responses, setResponses] = useState([
//         { id: 1, text: "Sample response 1", votes: 0 },
//         { id: 2, text: "Sample response 2", votes: 0 },
//         { id: 3, text: "Sample response 3", votes: 0 },
//         { id: 4, text: "Sample response 4", votes: 0 },
//     ]);

//     const [projectResponses, setProjectResponses] = useState([]);

//     const handleVote = (responseId, voteType) => {
//         const updatedResponses = responses.map((response) => {
//         if (response.id === responseId) {
//             if (voteType === "up") {
//             return { ...response, votes: response.votes + 1 };
//             } else if (voteType === "down") {
//             return { ...response, votes: response.votes - 1 };
//             }
//         }
//         return response;
//         });

//         setResponses(updatedResponses);
//     };

//     const handleDrop = (event, projectId) => {
//         event.preventDefault();
//         const responseId = event.dataTransfer.getData("responseId");
//         const response = responses.find(
//         (response) => response.id === parseInt(responseId)
//         );
//         if (response) {
//         const updatedResponses = responses.filter(
//             (response) => response.id !== parseInt(responseId)
//         );
//         setResponses(updatedResponses);
//         const updatedProjectResponses = [
//             ...projectResponses,
//             { ...response, projectId },
//         ];
//         setProjectResponses(updatedProjectResponses);
//         }
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     return (
//         <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//             <h1 className="text-2xl font-bold mb-4">Voting</h1>
//             <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//                 <h2 className="text-lg font-bold mb-2">Responses</h2>
//                 <ul>
//                 {responses.map((response) => (
//                     <li
//                     key={response.id}
//                     className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg mb-2"
//                     draggable
//                     onDragStart={(event) =>
//                         event.dataTransfer.setData("responseId", response.id)
//                     }
//                     >
//                     <span>{response.text}</span>
//                     <div>
//                         <button
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleVote(response.id, "up")}
//                         >
//                         +
//                         </button>
//                         <span className="mx-2">{response.votes}</span>
//                         <button
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleVote(response.id, "down")}
//                         >
//                         -
//                         </button>
//                     </div>
//                     </li>
//                 ))}
//                 </ul>
//             </div>
//             <div>
//                 <h2 className="text-lg font-bold mb-2">Project Columns</h2>
//                 <ul>
//                 <li
//                     className="bg-gray-200 px-4 py-2 rounded-lg mb-2"
//                     onDrop={(event) => handleDrop(event, 1)}
//                     onDragOver={handleDragOver}
//                 >
//                     <h3 className="font-bold mb-2">Column 1</h3>
//                     <ul>
//                     {projectResponses
//                         .filter((response) => response.projectId === 1)
//                         .map((response) => (
//                         <li
//                             key={response.id}
//                             className="flex items-center justify-between"
//                         >
//                             <span>{response.text}</span>
//                             <span>{response.votes}</span>
//                         </li>
//                         ))}
//                     </ul>
//                 </li>
//                 <li
//                     className="bg-gray-200 px-4 py-2 rounded-lg mb-2"
//                     onDrop={(event) => handleDrop(event, 2)}
//                     onDragOver={handleDragOver}
//                 >
//                     <h3 className="font-bold mb-2">Column 2</h3>
//                     <ul>
//                     {projectResponses
//                         .filter((response) => response.projectId === 2)
//                         .map((response) => (
//                         <li
//                             key={response.id}
//                             className="flex items-center justify-between"
//                         >
//                             <span>{response.text}</span>
//                             <span>{response.votes}</span>
//                         </li>
//                         ))}
//                     </ul>
//                 </li>
//                 </ul>
//             </div>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default Voting;
