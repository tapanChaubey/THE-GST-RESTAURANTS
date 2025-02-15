import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({
    userId: null,
    accessToken: null,
    setAccessToken: () => {},
    setUserId: () => {}
});
export const UserContextProvider = ({ children }) => {
    const [accessToken, setToken] = useState(Cookies.get("access_token"));
    const [userId, setId] = useState(Cookies.get("user_id"));
    const setUserId = (userId)=>{
        Cookies.set("user_id", userId);
        setId(userId);
    }
    const setAccessToken = (accessToken) =>{
        Cookies.set("access_token", accessToken);
        setToken(accessToken);
    }
    useEffect(()=>{
        console.log(accessToken);
    },[accessToken]);

    return (
        <UserContext.Provider value={{userId, accessToken, setAccessToken, setUserId}}>
            {children}
        </UserContext.Provider>
    );
}



