import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userVotes, setUserVotes] = useState({});

    const validUsers = [
        "tickle122",
        "grumpy19",
        "happyamy2016",
        "cooljmessy",
        "weegembump",
        "jessjelly"
  ];

    const login = (username) => {
        setUser(username);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };
  
  return (
    <userContext.Provider value={{ 
        user, 
        setUser, 
        userVotes, 
        setUserVotes,
        isLoggedIn,
        setIsLoggedIn,
        validUsers,
        login,
        logout
    }}>
        {children}
    </userContext.Provider>
);
};