import React, { useState } from "react";
import axios from "axios";

const AddUserForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/api/accounts", {
            email,
            password,
            full_name: full_name,
        });
        console.log(response.data);
        resetForm();
        alert(
            `Congratulations, account was successfully created!`
        );
        } catch (error) {
        console.log(error.response.data);
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setFullName("");
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="full_name">Full Name:</label>
            <input
            type="text"
            id="full_name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            />
        </div>
        <button type="submit">Add User</button>
        </form>
    );
};

export default AddUserForm;

// import React, { useState } from "react";
// import axios from "axios";

// const AddUserForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [full_name, setFullName] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8000/api/accounts", {
//                 email,
//                 password,
//                 full_name: full_name,
//             });
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="full_name">Full Name:</label>
//                 <input
//                 type="text"
//                 id="full_name"
//                 value={full_name}
//                 onChange={(e) => setFullName(e.target.value)}
//                 />
//             </div>
//             <button type="submit">Add User</button>
//         </form>
//     )

// }

// export default AddUserForm
