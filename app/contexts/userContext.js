import React, { createContext, useState, useContext } from "react";

// create user context to hold user data and authentication methods
const UserContext = createContext();

// provide the user context to components within app
export const UserProvider = ({ children }) => {
    // store user information
    const [user, setUser] = useState(null);

    const login = (username) => {
        setUser({ name: username });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        // pass user data and authentication functions to context consumer
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// hook to access the UserContext values within app components
export const useUser = () => useContext(UserContext);
