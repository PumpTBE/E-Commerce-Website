
import validator from "validator";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import http from "../http";
import { useNavigate } from "react-router-dom";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }
    const { data } = await http.post("/users/login", { email, password });
    if (data.error) {
      setError(data.error);
      return;
    }
    if (data.success) {
      Swal.fire("Done", data.user.username + ", welcome", "success");
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    }

    // setError("");
    // alert("Login succesful");
  }

  //Send the form information to the backend

  return (
    <>
      <h1 className="text-center text-white mt-3">Login</h1>;
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control mb-3"
          placeholder="Password"
        />

        <button className="btn btn-success w-100">Login</button>
      </form>
    </>
  );
}
