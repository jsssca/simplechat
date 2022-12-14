import { useState } from "react";

// User management hook
const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token; // return token if token exists in session storage
  };

  const [token, setToken] = useState(getToken());

  // saves token to session storage
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  // remove token from sesion storage
  const clearToken = () => {
    sessionStorage.clear();
    setToken(null);
  };

  return {
    setToken: saveToken,
    clearToken,
    token,
  };
};

export { useToken };
