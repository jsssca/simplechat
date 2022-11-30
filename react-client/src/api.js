import axios from "axios";

const BASE_URL = "";
const url = (x) => `${BASE_URL}${x}`;

axios.defaults.withCredentials = true;

const login = (username, password) => {
  return axios
    .post(url("/api/auth/login"), {
      username,
      password,
    })
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

const register = (username, email, password) => {
  return axios
    .post(url("/api/auth/register"), {
      username,
      email,
      password,
    })
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

module.exports = { login, register };

//getChats
