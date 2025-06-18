import { useState } from "react";
import { useEffect } from "react";
import "./AllGames.css"
import Navbar from "./Navbar";
import GameCard from "./GameCard";
import GameFilters from "./GameFilters";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { FavoriteContext } from "../store/FavoriteContext";
import { useContext } from "react";

function FavoriteGames({filterFavorites})
{
    const [giochi,setGiochi] = useState([])
    
    const {favoriteIds, setFavoriteIds, userId} = useContext(FavoriteContext)

    //recupero tutti i giochi (ancora no paginazione)
    useEffect(() => 
    {
        fetch(`http://localhost:8080/game/getAllFavoriteGames?userId=${userId}`).then(response => response.json()).then(data => setGiochi(data))
    },[userId])

    

   

    return(
        <>

            <Navbar></Navbar>
            

            <div className="allgames-wrapper">
                
                <GameFilters  filterFavorites = {filterFavorites}/>
                
                <div className="games-container">
                    {giochi.map(gioco => (
                        //<Link to={`/game/${gioco.id}`} key={gioco.id} state={{gioco}}>
                            <GameCard key={gioco.id} gioco={gioco} />
                        //</Link>
                    ))}
                </div>
            </div>

            <Footer></Footer>

            

        </>
    )
}

export default FavoriteGames;