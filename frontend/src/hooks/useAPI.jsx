import { useEffect } from "react";
import { useRef } from "react";


function useAPI() {

    const serverUrl = useRef(import.meta.env.VITE_SERVER_URL);

    const get = async (route, args = {}) => {
        const response = await fetch(`${serverUrl.current}${route}`, {
            method: "GET",
            headers: {
                "Content-Type": args.contentType || "application/json"
            }
        });

        return await response.json();
    };

    const post = async (route, payload, args = {}) => {
        const response = await fetch(`${serverUrl.current}${route}`, {
            method: "POST",
            headers: {
                "Content-Type": args.contentType || "application/json",
            },
            body: JSON.stringify(payload)
        });

        return await response.json();   
    };

    

    return { get, post };

}

export default useAPI;