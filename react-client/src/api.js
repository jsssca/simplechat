import axios from "axios";

const BASE_URL = "http://localhost:5000";
const url = (x) => `${BASE_URL}${x}`;

// axios.defaults.withCredentials = true;

// const login = (username, password) => {
//   return axios
//     .post(url("/api/auth/login"), {
//       username,
//       password,
//     })
//     .then((x) => x.data)
//     .catch((e) => {
//       throw new Error(e.response && e.response.data && e.response.data.message);
//     });
// };

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

const login = (username, password) => {
  return {
    username: "Lettuce",
    avatar: "samoyed.png",
  };
};

const logout = () => {
  console.log("LOGGED OUT");
};

const getChats = () => {
  return axios
    .post(url("/api/messages/getchats"), {})
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

export { login, logout, getChats, getMessages };
