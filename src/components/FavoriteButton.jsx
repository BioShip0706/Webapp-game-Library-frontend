import { useContext } from "react"
import { FavoriteContext } from "../store/FavoriteContext"
import { useNavigate, useParams } from "react-router-dom"

import { AuthContext } from '../store/AuthContext';

function FavoriteButton({giocoId, stile})
{
    const {favoriteIds, setFavoriteIds, userId} = useContext(FavoriteContext)
    const {jwtToken} = useContext(AuthContext)

    const navigate = useNavigate();

    function handlePreferito(e)
    {
        e.preventDefault(); //blocco la navigazione del Link To 
        e.stopPropagation(); //impedisco diffusione di effetto 

        if(!userId)
        {
            navigate("/login");
            return;
        }

        
        console.log("iL GAME ID RICEVUTO è: " + giocoId)
        
        if(favoriteIds.includes(giocoId))
        {
            //rimuovo gioco dalla lista e dal db facendo fetch
            setFavoriteIds(favoriteIds.filter(id => id !== giocoId))
            fetch(`http://localhost:8080/favorite/deleteFavoriteGame?userId=${userId}&gameId=${giocoId}`,
                 {method: 'DELETE', 
                  headers: {'Authorization': `Bearer ${jwtToken}`}
            });
        }
        else
        {
            setFavoriteIds([...favoriteIds,giocoId]);
            fetch(`http://localhost:8080/favorite/addNewFavoriteGame?userId=${userId}&gameId=${giocoId}`, 
                {method: 'POST',
                 headers: {'Authorization': `Bearer ${jwtToken}`}
                });
        }
    }

    return(
        <>
            <div className={stile} onClick={handlePreferito}>
                            {favoriteIds.includes(giocoId) ? "💖" : "🤍"} 
            </div>
        </>
    )
}

export default FavoriteButton