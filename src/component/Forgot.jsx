import React from "react";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const navigate = useNavigate();
  const handleSub = () => navigate("/");
  return (
    <div>
      <p>Forgot your password</p>
      <button onClick={handleSub}>Back</button>
    </div>
  );
}

export default Forgot;
