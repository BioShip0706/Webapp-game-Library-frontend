
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../store/FavoriteContext";

function GameCard({gioco})
{
    const {favoriteIds} = useContext(FavoriteContext)

    console.log(favoriteIds);
    
    return (
        <>
                    
                    <Link to={`/game/${gioco.id}`} key={gioco.id} className="gioco">
                        
                            <img src={gioco.imageURL} alt={gioco.title} />
                            <h2>{gioco.title}</h2>
                            <p>Sviluppatore: {gioco.developer}</p>
                            <p>Voto: {gioco.score}</p>
                            {favoriteIds.includes(gioco.id) && "PREFERITO"}

                    </Link>

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