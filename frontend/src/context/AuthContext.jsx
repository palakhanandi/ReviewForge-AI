import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const login = () => {

        window.location.href =
            "http://127.0.0.1:8000/auth/login";

    };

    const logout = () => {

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;