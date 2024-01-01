import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
    console.log(result);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form
      onSubmit={handelSubmit}
      style={{ marginTop: "80px" }}
      className="container"
    >
      <h2>Create an account to use TaskDailyPro</h2>
      <div className="form-group mt-4 ">
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Enter Name"
          onChange={onChange}
          name="name"
          value={credentials.name}
          minLength={3}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email"></label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email"
          onChange={onChange}
          name="email"
          value={credentials.email}
          minLength={5}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"></label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          onChange={onChange}
          name="password"
          value={credentials.password}
          minLength={5}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>
    </form>
  );
}

export default Signup;
