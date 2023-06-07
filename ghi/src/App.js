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
import VisionBoard from "./VisionBoard";
import ImageList from "./ImageList";
import EditResponses from "./editResponses";
import Contact1 from "./contact";
import Pricing from "./pricing";
import Faq from "./faq";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(token !== null);
    }, []);
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "/iThink");
    return (
        <BrowserRouter basename={basename}>
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
                    <Route path="/VisionBoard" element={<VisionBoard />} />
                    <Route path="/ImageList" element={<ImageList />} />
                    <Route path="/editResponses" element={<EditResponses />} />
                    <Route path="/contact" element={<Contact1 />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route
                        path="/"
                        element={
                            loggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />
                        }
                    />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
