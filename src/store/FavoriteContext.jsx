import { createContext, useContext, useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";

export const FavoriteContext = createContext();

function FavoriteContextProvider({children})
{
    const [favoriteIds,setFavoriteIds] = useState([]);


    const [userId,setUserId] =  useState(localStorage.getItem("id") || null);
    
    useEffect(() => 
    {
        console.log("modifica all'userid!")
        if(userId)
        {
            fetch(`http://localhost:8080/favorite/getAllFavoriteGamesIds?userId=${userId}`).then(response => response.json()).then(data => setFavoriteIds(data))
        }
        else
        {
            setFavoriteIds([])
        }
        

    },[userId])

    return (
        <FavoriteContext.Provider value={{favoriteIds,setFavoriteIds, setUserId, userId}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContextProvider;
