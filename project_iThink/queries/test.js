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
          "http://localhost:8000/api/projects/list/"
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
            `http://localhost:8000/api/projects/${selectedProject.id}/`
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
    const responseToAdd = { response: newResponse };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/projects/${selectedProject.id}/add_response`,
        newResponse,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResponses([...responses, response.data]);
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

  return (
    <div>
      <h1>Responses</h1>
      <select onChange={handleProjectChange}>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
      {responses &&
        responses.map((response, index) => <div key={index}>{response}</div>)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newResponse}
          onChange={(event) => setNewResponse(event.target.value)}
          placeholder="Add custom response..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default EditResponses;
