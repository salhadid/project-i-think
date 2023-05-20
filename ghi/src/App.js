import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import AddUserForm from "./AddUserForm.js";
import AI from "./AI";
import NavBar from "./NavBar";
import WeatherWidget from "./WeatherWidget";
import UpdateUser from "./UpdateUser";

function App() {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// import "./App.css";
// import Draggable from "react-draggable";
// import LoginForm from "./LoginForm.js";
// import LogOut from "./LogOut.js";
// import AddUserForm from "./AddUserForm.js";
// import AI from "./AI";
// import WeatherWidget from "./WeatherWidget";

// function App() {
//   return (
//     <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen">
//       <div className="flex flex-wrap justify-center p-8">
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//           <Draggable>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-lg font-bold mb-2">Login Form</h2>
//               <LoginForm />
//             </div>
//           </Draggable>
//         </div>
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//           <Draggable>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-lg font-bold mb-2">Log Out</h2>
//               <LogOut />
//             </div>
//           </Draggable>
//         </div>
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//           <Draggable>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-lg font-bold mb-2">Add User Form</h2>
//               <AddUserForm />
//             </div>
//           </Draggable>
//         </div>
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//           <Draggable>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-lg font-bold mb-2">AI</h2>
//               <AI />
//             </div>
//           </Draggable>
//         </div>
//         <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//           <WeatherWidget />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// export default App;
