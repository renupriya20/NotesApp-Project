import { createContext, useContext, useState } from "react";

//! STEP 1
const AuthContext = createContext();

//! STEP 2
export const UserContextProvider = (props) => {
    const [user, setUser] = useState(() => {
        let data = localStorage.getItem("authUser");
        return data ? JSON.parse(data) : null;
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

//! STEP 3 :-- CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);