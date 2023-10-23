import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import AddUserForm from "./AddUserForm.js";
import AI from "./AI";
import NavBar from "./NavBar";
import UpdateUser from "./UpdateUser";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";
import Footer from "./Footer";
import CreateProject from "./CreateProject";
import ProjectForm from "./ProjectForm";
import VisionBoard from "./VisionBoard";
import ImageList from "./ImageList";
import EditResponses from "./editResponses";
import Contact1 from "./contact";
import Pricing from "./pricing";
import Faq from "./faq";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(token !== null);
    }, []);

    useEffect(() => {
        switch (location.pathname) {
            case "/login":
                document.title = "Login to App";
                break;
            case "/register":
                document.title = "Register for App";
                break;
            case "/ai":
                document.title = "AI Interface";
                break;
            case "/update":
                document.title = "Update User Info";
                break;
            case "/create/project":
                document.title = "Create a Project";
                break;
            case "/projectForm":
                document.title = "Project Form";
                break;
            case "/VisionBoard":
                document.title = "Vision Board";
                break;
            case "/ImageList":
                document.title = "Image List";
                break;
            case "/editResponses":
                document.title = "Edit Responses";
                break;
            case "/contact":
                document.title = "Contact Us";
                break;
            case "/pricing":
                document.title = "Pricing Details";
                break;
            case "/faq":
                document.title = "Frequently Asked Questions";
                break;
            case "/":
                document.title = loggedIn ? "Home" : "iThink";
                break;
            default:
                document.title = "Your Default Title";
                break;
        }
    }, [location.pathname, loggedIn]);

    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");
    return (
        <BrowserRouter basename={basename}>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<AddUserForm />} />
                    <Route path="/ai" element={<AI />} />
                    <Route path="/update" element={<UpdateUser />} />
                    <Route path="/create/project" element={<CreateProject />} />
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
