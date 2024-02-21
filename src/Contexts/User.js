// Utils
import getCurrentCustomerData from "../util/getCurrentUserData";
import { authAPI } from "../util/API/APIS";

// Modules
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosAPI } from "../util/axios";
import AxiosAPIError from "../util/errors/AxiosAPIError";

const userContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(getCurrentCustomerData());
  const nav = useNavigate();

  const isLoggedIn = user ? true : false;

  const isTokenExpired = useCheckToken(isLoggedIn);

  useEffect(() => {
    if (isTokenExpired) {
      localStorage.clear();
      setUser(null);
      nav("/auth/login");
    }
  }, [isTokenExpired]);

  return (
    <userContext.Provider value={{ user: user, setUser, isLoggedIn }}>
      {children}
    </userContext.Provider>
  );
}

function useCheckToken(isLoggedIn) {
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      authAPI
        .checkToken()
        .then(() => setIsTokenExpired(false))
        .catch((err) => {
          if (err instanceof AxiosAPIError && err.statusCode === 401)
            setIsTokenExpired(true);
        });
    }
  }, [isLoggedIn]);

  return isTokenExpired;
}

export { userContext, UserContextProvider };
