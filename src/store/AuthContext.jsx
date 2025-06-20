import { Children, createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

function AuthContextProvider({children})
{
    const [isAdmin,setAdmin] = useState(false);

    const [jwtToken,setJwtToken] = useState(localStorage.getItem("token") || null);

    useEffect(() =>
    {
        if(jwtToken)
        {
            fetch("http://localhost:8080/user/get-me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
            })
            .then(response => {
                if (!response.ok) throw new Error("You are not an admin!");
                return response.json();
            })
            .then(data => {
                const isUserAdmin = data.authorities.includes("ROLE_ADMIN");
                setAdmin(isUserAdmin); 
                console.log("isAdmin?: " , isUserAdmin);
            })
            .catch(error => {
                console.error("Error: ", error);
                setAdmin(false)
            });
        }
        else
        {
            setAdmin(false);
        }
    
    },[jwtToken])

    return(
        <>
            <AuthContext.Provider value = {{isAdmin, setJwtToken}}>
                {children}
            </AuthContext.Provider>
        </>
    )

}

export default AuthContextProvider; 