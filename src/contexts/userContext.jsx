import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userVotes, setUserVotes] = useState({});

    const validUsers = [
      "eevee",
      "abzol",
      "psyduck",
  ];
  
  return (
    <userContext.Provider value={{ 
        user, 
        setUser, 
        userVotes, 
        setUserVotes,
        isLoggedIn,
        setIsLoggedIn,
        validUsers 
    }}>
        {children}
    </userContext.Provider>
);
};