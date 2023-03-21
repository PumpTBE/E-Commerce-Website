
import validator from "validator";
import { useState } from "react";
import axios from "axios";
import http from "../http";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Registerpage(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    // === Frontend Form Validation ===
    //Check for valid email
    if (!validator.isEmail(email)) {
      setError("Email format is invalid");
      return;
    }
    //Check for conventional username
    if (!validator.isAlphanumeric(username)) {
      setError("Username should contain only alphabets and numbers");
      return;
    }
    //Check for password length
    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }
    //check for password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // setError("");
    // alert("Registration succesful");
    // === Backend Validation ===
    // === Check for Exiting Users ===

    //Send the form information to the backend server
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      { email, username, password }
    );
    if (data.error) {
      setError(data.error);
    }
    if (data.success) {
      Swal.fire("Done", username + ", welcome to mens store", "success");
      navigate("/login");
    }
  }

  return (
    <>
      <h1 className="text-center text-white mt-3">Register</h1>;
      <form
        onSubmit={submitHandler}
        action=""
        style={{ maxWidth: "450px", margin: "auto" }}
        className="form"
      >
        {error && <div className="alert alert-danger p-2">{error}</div>}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control mb-3"
          placeholder="Email"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          className="form-control mb-3"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control mb-3"
          placeholder="Password"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
        />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </>
  );
}
