import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (username === "") {
      toast.error("Please enter your username.");
      return false;
    } else if (password == "") {
      toast.error("Please enter your password.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = values;
    if (handleValidation()) {
      console.log("OK"); // call api login, save user to global state, call onlogin(username, password)
    } else {
      console.log("NOTOK");
    }
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          value={values.username}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          onChange={(e) => handleChange(e)}
          value={values.password}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/register">Register Here</Link>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
