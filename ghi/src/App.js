import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import AddUserForm from "./AddUserForm.js";
import AI from "./AI";
import NavBar from "./NavBar";
import WeatherWidget from "./WeatherWidget";
import UpdateUser from "./UpdateUser";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";
import Footer from "./Footer";
import CreateProject from "./CreateProject";
import Voting from "./Voting";
import ProjectForm from "./ProjectForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(token !== null);
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<AddUserForm />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/WeatherWidget" element={<WeatherWidget />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/create/project" element={<CreateProject />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/projectForm" element={<ProjectForm />} />
          <Route
            path="/"
            element={loggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
