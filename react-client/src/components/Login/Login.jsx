import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../api";

export default function Login({ setToken }) {
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
    } else if (password === "") {
      toast.error("Please enter your password.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = values;
    if (handleValidation()) {
      login(username, password).then((x) => setToken({ token: x.token }));
    }
  };

  return (
    <main className="container container--centre">
      <form
        className="form form__login"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          className="form__input form__input--small"
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          value={values.username}
        />
        <input
          className="form__input form__input--small"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          value={values.password}
        />
        <button className="btn btn__login btn--colourful" type="submit">
          Login
        </button>
        <span className="label">Don't have an account? Register Here</span>
      </form>
      <ToastContainer />
    </main>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
