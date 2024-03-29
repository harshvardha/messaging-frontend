import { useState } from "react";
import React from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [profilePicUrl, setProfilePicUrl] = useState("");

    return (
        <UserContext.Provider
            value={{
                profilePicUrl,
                setProfilePicUrl
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };