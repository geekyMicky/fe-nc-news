import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("weegembump");
    const [userVotes, setUserVotes] = useState({});
  
    return (
      <userContext.Provider value={{ user, setUser, userVotes, setUserVotes }}>
        {children}
      </userContext.Provider>
    );
  };