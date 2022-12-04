import axios from "axios";

const BASE_URL = "http://localhost:5000";
const url = (x) => `${BASE_URL}${x}`;

axios.defaults.withCredentials = true;

const login = (username, password) => {
  return axios
    .post(url("/api/auth/login"), {
      username: username,
      password: password,
    })
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

// const register = (username, email, password) => {
//   return axios
//     .post(url("/api/auth/register"), {
//       username,
//       email,
//       password,
//     })
//     .then((x) => x.data)
//     .catch((e) => {
//       throw new Error(e.response && e.response.data && e.response.data.message);
//     });

const logout = () => {
  return axios
    .get(url("/api/auth/logout"))
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

const addMessage = (username, msg) => {
  return axios
    .post(url("/api/messages/addmsg"), {
      to: username,
      message: msg,
    })
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

const getChats = () => {
  return axios
    .get(url("/api/messages/getchats"))
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

const getUsers = () => {
  return axios
    .get(url("/api/messages/getusers"))
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

const getMessages = (partner) => {
  return axios
    .post(url("/api/messages/getmsgs"), {
      partner: partner,
    })
    .then((x) => x.data)
    .catch((e) => {
      throw new Error(e.response && e.response.data && e.response.data.message);
    });
};

export { login, logout, getChats, getUsers, getMessages, addMessage, BASE_URL };
