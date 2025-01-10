import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import SignupLogo from "../assets/vet-clinic1.png";

function Signup() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
    contactNumber: "",
    role: "user",
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const adminUser = users.find((user) => user.role === "admin");
      if (adminUser) {
        setAdminExists(true);
      }
      console.log("Fetch users", users);
    }
  }, [users]);

  const handleChangeInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setIsAdmin(value === "admin");
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://vet-backend-m3o7.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          alert("Success:" + data.message);
          navigate("/login");
          resetForm();
        } else {
          alert("Error:" + data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      password: "",
      address: "",
      contactNumber: "",
      role: "user",
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-child">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-logo">
            <img src={SignupLogo} alt="signupLogo" />
          </div>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChangeInput("email", e.target.value)}
            required
          />

          <input
            className="input1"
            type="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChangeInput("name", e.target.value)}
            required
          />

          <input
            className="input2"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleChangeInput("password", e.target.value)}
            required
          />

          <input
            className="input3"
            type="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={(e) => handleChangeInput("address", e.target.value)}
            required
          />

          <input
            className="input4"
            type="enter number"
            placeholder="Enter Number"
            value={formData.contactNumber}
            onChange={(e) => handleChangeInput("contactNumber", e.target.value)}
            required
          />
          <div className="radio">
            <input
              type="radio"
              value="user"
              checked={formData.role === "user"}
              onChange={handleRoleChange}
            />
            <label>User</label>
            {!adminExists && (
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleRoleChange}
                />
                Admin
              </label>
            )}
          </div>
          <div>
            <button className="bttn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <p>
              Already have account?
              <a
                className="ptext"
                style={{ textDecoration: "none" }}
                href="/login"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
