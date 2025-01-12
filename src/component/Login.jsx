import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import VetLogo from "../assets/vet-clinic1.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChangeInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     setLoading(true);
    fetch("https://vet-backend-m3o7.onrender.com/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
          });
        } else {
         Cookies.set("token", data.token, {
            expires: 7, 
            secure: true, 
            sameSite: "Strict",
          });
          dispatch(login(data.user));
          toast.success("Login successful!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
          });
          if (data.user.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate(`/userdashboard/${data.user.userId}`);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error", error);
        toast.error("An error occurred. Please try again.", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="login-container">
      <div className="login-child">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="vet-logo">
            <img src={VetLogo} alt="vetlogo" />
          </div>
          <input
            className="text"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChangeInput("email", e.target.value)}
            required
          />

          <input
            className="pass"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleChangeInput("password", e.target.value)}
            required
          />
          <div className="container1">
            <button className="button" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
            <p>
              Don't have account yet?
              <a style={{ textDecoration: "none" }} href="/signup">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
