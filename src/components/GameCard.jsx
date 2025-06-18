
import "./GameCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../store/FavoriteContext";
import FavoriteButton from "./FavoriteButton";


function GameCard({gioco})
{
    // const {favoriteIds, setFavoriteIds, userId} = useContext(FavoriteContext)

    // const navigate = useNavigate();

    //console.log(favoriteIds);

    // function handlePreferito(e)
    // {
    //     e.preventDefault(); //blocco la navigazione del Link To 
    //     e.stopPropagation(); //impedisco diffusione di effetto 

    //     if(!userId)
    //     {
    //         navigate("/login");
    //         return;
    //     }

        
    //     console.log("ciao")
        
    //     if(favoriteIds.includes(gioco.id))
    //     {
    //         //rimuovo gioco dalla lista e dal db facendo fetch
    //         setFavoriteIds(favoriteIds.filter(id => id !== gioco.id))
    //         fetch(`http://localhost:8080/favorite/deleteFavoriteGame?userId=${userId}&gameId=${gioco.id}`, {method: 'DELETE'});
    //     }
    //     else
    //     {
    //         setFavoriteIds([...favoriteIds,gioco.id]);
    //         fetch(`http://localhost:8080/favorite/addNewFavoriteGame?userId=${userId}&gameId=${gioco.id}`, {method: 'POST'});
    //     }
    // }
    
    return (
        <>
                    
                    <Link to={`/game/${gioco.id}`} key={gioco.id} className="gioco">
                        {/* <div className="gioco-cuore" onClick={handlePreferito}>
                            {favoriteIds.includes(gioco.id) ? "💖" : "🤍"} 
                        </div> */}
                        <FavoriteButton giocoId = {gioco.id} stile = "gameCardHeart"></FavoriteButton>

                        <img src={gioco.imageURL} alt={gioco.title} />
                        <h2>{gioco.title}</h2>

                        <div className="gioco-info">
                            <span>{gioco.developer}</span>
                            <span className="voto">{gioco.score}  ⭐</span>
                        </div>
                    </Link>


                    {/* <Link to={`/game/${gioco.id}`} key={gioco.id} className="gioco">
                        
                            <img src={gioco.imageURL} alt={gioco.title} />
                            <h2>{gioco.title}</h2>
                            <p>Sviluppatore: {gioco.developer}</p>
                            <p>Voto: {gioco.score}</p>
                            {favoriteIds.includes(gioco.id) ? "❤️" : "🤍"}

                    </Link> */}

                    {/* <Link to={`/game/${gioco.id}`} key={gioco.id} className="game-link">
                        <div key={gioco.id} className="gioco">
                            <img src={gioco.imageURL} alt={gioco.title} />
                            <h2>{gioco.title}</h2>
                            <p>Sviluppatore: {gioco.developer}</p>
                            <p>Voto: {gioco.score}</p>
                        </div>
                    </Link> */}
        
        </>
    )
}

export default GameCard;