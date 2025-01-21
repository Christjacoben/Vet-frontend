import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Forgot from "./component/Forgot";
import { store } from "./store/store";
import UserDashboard from "./component/UserDashboard";
import LandingPage from "./component/LandingPage";
//import Restriction from "./component/Restriction";
import { SocketProvider } from "./SocketContext";

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <Router>
          <Routes>
            {/*
            <Route exact path="/" element={<Restriction />} />
            */}
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userdashboard/:userId" element={<UserDashboard />} />
          </Routes>
          <ToastContainer />
        </Router>
      </SocketProvider>
    </Provider>
  );
}

export default App;
