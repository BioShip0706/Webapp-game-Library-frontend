
import "./GameCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../store/FavoriteContext";
import FavoriteButton from "./FavoriteButton";
import EditGameButton from "./EditGameButton";
import DeleteGameButton from "./DeleteGameButton";


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
                    {/* <div className="gioco-cuore" onClick={handlePreferito}>
                            {favoriteIds.includes(gioco.id) ? "💖" : "🤍"} 
                        </div> */}

                    <Link to={`/game/${gioco.id}`} key={gioco.id} className="gioco">

                        <FavoriteButton giocoId={gioco.id} stile="gameCardHeart"/>
                        <EditGameButton gameId={gioco.id} stile="gioco-edit"></EditGameButton>
                        <DeleteGameButton gameId={gioco.id} stile="gioco-delete"></DeleteGameButton>

                        {/*<button className="gioco-edit">EDIT 🖋️</button>*/}
                        {/*<button className="gioco-delete">DELETE ❌</button>*/}

                        <img src={gioco.imageURL} alt={gioco.title} className="gioco-immagine" />
                        <h2 className="gioco-titolo">{gioco.title}</h2>

                        <div className="gioco-info">
                            <div className="gioco-dev-date">
                            <span className="gioco-developer">{gioco.developer}</span>
                            <span className="gioco-data">{new Date(gioco.releaseDate).getFullYear()}</span>
                            </div>
                            <span className="gioco-voto">{gioco.score} ⭐</span>
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