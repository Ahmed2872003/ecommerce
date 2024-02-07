// Utils
import getCurrentCustomerData from "../getCurrentUserData";

// Modules
import { createContext } from "react";

const userContext = createContext();

function UserContextProvider({ children }) {
  const user = getCurrentCustomerData();

  const isLoggedIn = user ? true : false;

  return (
    <userContext.Provider value={{ user: user, isLoggedIn }}>
      {children}
    </userContext.Provider>
  );
}

export { userContext, UserContextProvider };
