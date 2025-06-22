import { createContext, useContext, useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import { AuthContext } from '../store/AuthContext';

export const FavoriteContext = createContext();

function FavoriteContextProvider({children})
{
    const [favoriteIds,setFavoriteIds] = useState([]);


    const [userId,setUserId] =  useState(localStorage.getItem("id") || null);

    const {jwtToken} = useContext(AuthContext) //usarlo come bearer per i preferiti
    
    useEffect(() => 
    {
        console.log("modifica all'userid!")
        if(userId)
        {
            fetch(`http://localhost:8080/favorite/getAllFavoriteGamesIds?userId=${userId}`,
                {headers: {'Authorization': `Bearer ${jwtToken}`}
            } ).then(response => response.json()).then(data => setFavoriteIds(data))
        }
        else
        {
            setFavoriteIds([])
        }
        

    },[userId,jwtToken])

    return (
        <FavoriteContext.Provider value={{favoriteIds,setFavoriteIds, setUserId, userId}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContextProvider;
