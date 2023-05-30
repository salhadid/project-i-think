import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [funFact, setFunFact] = useState("");
    const [selectedAPI, setSelectedAPI] = useState("");
    const [dogImage, setDogImage] = useState("");
    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/token",
                `grant_type=password&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
                {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
                }
            );
            localStorage.setItem("token", response.data.access_token);
            console.log("Logged in successfully");
            toast.success(`User ${email} was logged in successfully`, {
                autoClose: 3000, // Display for 3 seconds
            });

            setTimeout(() => {
                // Navigate to home page and refresh
                navigate("/");
                window.location.reload();
            }, 3000); // Wait for 3 seconds before navigating and reloading
            resetForm();
        } catch (error) {
            console.error(error.response.data);
            setErrorMessage(
            "Incorrect email or password. Are you sure you're a human?"
            );
        }
    };


    const resetForm = () => {
        setEmail("");
        setPassword("");
        setErrorMessage("");
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleAPISelection = (api) => {
        setSelectedAPI(api);
    };

    useEffect(() => {
        const fetchFunFact = async () => {
        try {
            let url = "";
            let headers = {};
            switch (selectedAPI) {
            case "Chuck Norris Jokes":
                url = "https://api.chucknorris.io/jokes/random";
                break;
            case "Dad Jokes":
                url = "https://icanhazdadjoke.com/";
                headers = { Accept: "application/json" };
                break;
            case "Cat Facts":
                url = "https://catfact.ninja/fact";
                break;
            case "Dog Images":
                url = "https://dog.ceo/api/breeds/image/random";
                const response = await axios.get(url);
                setDogImage(response.data.message);
                break;
            case "Advice Slip":
                url = "https://api.adviceslip.com/advice";
                break;
            case "Jokes":
                url = "https://sv443.net/jokeapi/v2/joke/Any";
                break;
            default:
                url = "";
                break;
            }
            if (url) {
            const response = await axios.get(url, { headers });
            setFunFact(
                response.data.message ||
                response.data.value ||
                response.data.joke ||
                response.data.fact ||
                response.data.slip?.advice ||
                (response.data.setup && response.data.delivery
                    ? response.data.setup + " " + response.data.delivery
                    : undefined)
            );
            } else {
            setFunFact("");
            }
        } catch (error) {
            console.error(error);
            setFunFact("Failed to fetch fun fact :(");
        }
        };

        fetchFunFact();
    }, [selectedAPI]);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white justify-center items-center space-y-8">
        <animated.form
            style={fadeIn}
            onSubmit={handleSubmit}
            className="max-w-screen-lg mx-auto mt-4 p-10 bg-white rounded-lg shadow-md w-full"
        >
            <ToastContainer />
            <div className="mb-8">
            <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2 text-lg"
            >
                Email:
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            />
            </div>
            <div className="mb-8">
            <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 text-lg"
            >
                Password:
            </label>
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 text-lg"
                />
                <label
                htmlFor="show-password"
                className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer"
                >
                <input
                    type="checkbox"
                    id="show-password"
                    checked={showPassword}
                    onChange={handleShowPassword}
                    className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700 font-medium text-lg">
                    Show Password
                </span>
                </label>
            </div>
            </div>
            <div style={{ color: "red" }} className="mb-8 text-lg">
            {errorMessage}
            </div>
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
            >
            Login
            </button>
        </animated.form>
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">
            Select an API to generate a fun fact:
            </h2>
            <div className="flex space-x-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                onClick={() => handleAPISelection("Chuck Norris Jokes")}
            >
                Chuck Norris Jokes
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                onClick={() => handleAPISelection("Dad Jokes")}
            >
                Dad Jokes
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                onClick={() => handleAPISelection("Cat Facts")}
            >
                Cat Facts
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                onClick={() => handleAPISelection("Dog Images")}
            >
                Dog Images
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                onClick={() => handleAPISelection("Advice Slip")}
            >
                Advice Slip
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
                onClick={() => handleAPISelection("Jokes")}
            >
                Jokes
            </button>
            </div>
            <div className="text-center text-lg mt-4">
            {funFact ? (
                <p>{funFact}</p>
            ) : (
                <p>No fun fact generated yet. Select an API to generate one.</p>
            )}
            </div>
            {dogImage && (
            <div className="mt-4">
                <img src={dogImage} alt="Random dog" className="rounded-lg" />
            </div>
            )}
        </div>
        </div>
    );
};

export default LoginForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSpring, animated } from "react-spring";

// const LoginForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [funFact, setFunFact] = useState("");
//     const [selectedAPI, setSelectedAPI] = useState("");
//     const [dogImage, setDogImage] = useState("");
//     const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//         const response = await axios.post(
//             "http://localhost:8000/token",
//             `grant_type=password&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
//             {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Accept: "application/json",
//             },
//             }
//         );
//         localStorage.setItem("token", response.data.access_token);
//         console.log("Logged in successfully");
//         alert(`User ${email} was logged in successfully`);
//         // Navigate to home page and refresh
//         navigate("/");
//         window.location.reload();
//         resetForm();
//         } catch (error) {
//         console.error(error.response.data);
//         setErrorMessage(
//             "Incorrect email or password. Are you sure you're a human?"
//         );
//         }
//     };

//     const resetForm = () => {
//         setEmail("");
//         setPassword("");
//         setErrorMessage("");
//     };

//     const handleShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleAPISelection = (api) => {
//         setSelectedAPI(api);
//     };

//     useEffect(() => {
//         const fetchFunFact = async () => {
//         try {
//             let url = "";
//             let headers = {};
//             switch (selectedAPI) {
//             case "Chuck Norris Jokes":
//                 url = "https://api.chucknorris.io/jokes/random";
//                 break;
//             case "Dad Jokes":
//                 url = "https://icanhazdadjoke.com/";
//                 headers = { Accept: "application/json" };
//                 break;
//             case "Cat Facts":
//                 url = "https://catfact.ninja/fact";
//                 break;
//             case "Dog Images":
//                 url = "https://dog.ceo/api/breeds/image/random";
//                 const response = await axios.get(url);
//                 setDogImage(response.data.message);
//                 break;
//             case "Advice Slip":
//                 url = "https://api.adviceslip.com/advice";
//                 break;
//             case "Jokes":
//                 url = "https://sv443.net/jokeapi/v2/joke/Any";
//                 break;
//             default:
//                 url = "";
//                 break;
//             }
//             if (url) {
//             const response = await axios.get(url, { headers });
//             setFunFact(
//             response.data.message ||
//                 response.data.value ||
//                 response.data.joke ||
//                 response.data.fact ||
//                 response.data.slip?.advice ||
//                 (response.data.setup && response.data.delivery
//                 ? response.data.setup + " " + response.data.delivery
//                 : undefined)
//             );

//             } else {
//             setFunFact("");
//             }
//         } catch (error) {
//             console.error(error);
//             setFunFact("Failed to fetch fun fact :(");
//         }
//         };

//         fetchFunFact();
//     }, [selectedAPI]);

//     return (
//         <div className="flex flex-col h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white justify-center items-center space-y-8">
//         <animated.form
//             style={fadeIn}
//             onSubmit={handleSubmit}
//             className="max-w-screen-lg mx-auto mt-4 p-10 bg-white rounded-lg shadow-md w-full"
//         >
//             <div className="mb-8">
//             <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-bold mb-2 text-lg"
//             >
//                 Email:
//             </label>
//             <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
//             />
//             </div>
//             <div className="mb-8">
//             <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-bold mb-2 text-lg"
//             >
//                 Password:
//             </label>
//             <div className="relative">
//                 <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 text-lg"
//                 />
//                 <label
//                 htmlFor="show-password"
//                 className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer"
//                 >
//                 <input
//                     type="checkbox"
//                     id="show-password"
//                     checked={showPassword}
//                     onChange={handleShowPassword}
//                     className="form-checkbox h-5 w-5 text-gray-600"
//                 />
//                 <span className="ml-2 text-gray-700 font-medium text-lg">
//                     Show Password
//                 </span>
//                 </label>
//             </div>
//             </div>
//             <div style={{ color: "red" }} className="mb-8 text-lg">
//             {errorMessage}
//             </div>
//             <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//             >
//             Login
//             </button>
//         </animated.form>
//         <div className="flex flex-col items-center justify-center">
//             <h2 className="text-2xl font-bold mb-4">
//             Select an API to generate a fun fact:
//             </h2>
//             <div className="flex space-x-4">
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//                 onClick={() => handleAPISelection("Chuck Norris Jokes")}
//             >
//                 Chuck Norris Jokes
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//                 onClick={() => handleAPISelection("Dad Jokes")}
//             >
//                 Dad Jokes
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//                 onClick={() => handleAPISelection("Cat Facts")}
//             >
//                 Cat Facts
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//                 onClick={() => handleAPISelection("Dog Images")}
//             >
//                 Dog Images
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//                 onClick={() => handleAPISelection("Advice Slip")}
//             >
//                 Advice Slip
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
//                 onClick={() => handleAPISelection("Jokes")}
//             >
//                 Jokes
//             </button>
//             </div>
//             <div className="text-center text-lg mt-4">
//             {funFact ? (
//                 <p>{funFact}</p>
//             ) : (
//                 <p>No fun fact generated yet. Select an API to generate one.</p>
//             )}
//             </div>
//             {dogImage && (
//             <div className="mt-4">
//                 <img src={dogImage} alt="Random dog" className="rounded-lg" />
//             </div>
//             )}
//         </div>
//         </div>
//     );
// };

// export default LoginForm;
