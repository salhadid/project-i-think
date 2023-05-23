import React, { useState, useEffect } from "react";
import axios from "axios";

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
          "http://localhost:8000/api/projects/list/"
        );
        setProjects(projectsResponse.data);

        const usersResponse = await axios.get(
          "http://localhost:8000/api/accounts/"
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
        `http://localhost:8000/api/projects/${selectedProject}/assign?user_id=${selectedUser}&role=${role}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Successfully assigned user to the project.");
      setError(""); // clear any previous errors
      setSelectedProject(""); // clear selected project
      setSelectedUser(""); // clear selected user
      setRole(""); // clear role input
    } catch (error) {
      console.error("Server responded with an error:", error.response.data);
      setError(
        error.response.data.detail ||
          "An error occurred while assigning the user to the project."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <form
        className="bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Add Member to Project</h2>

        {/* Project selection */}
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

        {/* User selection */}
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

        {/* Role input */}
        <input
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          required
        />

        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Success message */}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Submit button */}
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ProjectForm() {
//     const [projects, setProjects] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedProject, setSelectedProject] = useState("");
//     const [selectedUser, setSelectedUser] = useState("");
//     const [role, setRole] = useState("");

//     useEffect(() => {
//         axios
//         .get("http://localhost:8000/api/projects/list/")
//         .then((response) => setProjects(response.data))
//         .catch((error) => console.error(error));

//         axios
//         .get("http://localhost:8000/api/accounts/")
//         .then((response) => setUsers(response.data))
//         .catch((error) => console.error(error));
//     }, []);

//     const handleSubmit = (event) => {
//     event.preventDefault();

//     const url = `http://localhost:8000/api/projects/${selectedProject}/assign?user_id=${selectedUser}&role=${role}`;

//     fetch(url, {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json",
//         },
//     })
//         .then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         console.log(response.json());
//         alert("Successfully assigned user to the project.");
//         })
//         .catch((error) => {
//         console.error(error);
//         alert("Error assigning user to the project.");
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//         <select
//             value={selectedProject}
//             onChange={(e) => setSelectedProject(e.target.value)}
//         >
//             <option value="">Select Project</option>
//             {projects.map((project) => (
//             <option key={project.id} value={project.id}>
//                 {project.title}
//             </option>
//             ))}
//         </select>

//         <select
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//         >
//             <option value="">Select User</option>
//             {users.map((user) => (
//             <option key={user.id} value={user.id}>
//                 {user.email}
//             </option>
//             ))}
//         </select>

//         <input
//             type="text"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             placeholder="Role"
//             required
//         />

//         <button type="submit">Assign</button>
//         </form>
//     );
// }

// export default ProjectForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ProjectForm() {
//     const [projects, setProjects] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedProject, setSelectedProject] = useState("");
//     const [selectedUser, setSelectedUser] = useState("");
//     const [role, setRole] = useState("");

//     useEffect(() => {
//         axios
//         .get("http://localhost:8000/api/projects/list/")
//         .then((response) => setProjects(response.data))
//         .catch((error) => console.error(error));

//         axios
//         .get("http://localhost:8000/api/accounts/")
//         .then((response) => setUsers(response.data))
//         .catch((error) => console.error(error));
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         axios
//         .post(
//             `http://localhost:8000/api/projects/${selectedProject}/assign?user_id=${selectedUser}&role=${role}`
//         )
//         .then((response) => {
//             console.log(response.data);
//             alert("Successfully assigned user to the project.");
//         })
//         .catch((error) => console.error(error));
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//         <select
//             value={selectedProject}
//             onChange={(e) => setSelectedProject(e.target.value)}
//         >
//             <option value="">Select Project</option>
//             {projects.map((project) => (
//             <option key={project.id} value={project.id}>
//                 {project.title}
//             </option>
//             ))}
//         </select>

//         <select
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//         >
//             <option value="">Select User</option>
//             {users.map((user) => (
//             <option key={user.id} value={user.id}>
//                 {user.email}
//             </option>
//             ))}
//         </select>

//         <input
//             type="text"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             placeholder="Role"
//             required
//         />

//         <button type="submit">Assign</button>
//         </form>
//     );
// }

// export default ProjectForm;
