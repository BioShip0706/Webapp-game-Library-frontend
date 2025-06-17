import { useState } from "react";
import { useEffect } from "react";
import "./AllGames.css"
import Navbar from "./Navbar";
import GameCard from "./GameCard";
import GameFilters from "./GameFilters";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

function AllGames()
{
    const [giochi,setGiochi] = useState([])

    //recupero tutti i giochi (ancora no paginazione)
    useEffect(() => 
    {
        fetch("http://localhost:8080/game/getAllGames").then(response => response.json()).then(data => setGiochi(data))
    },[])

    

   

    return(
        <>

            <Navbar></Navbar>
            

            <div className="allgames-wrapper">
                <GameFilters />
                <div className="games-container">
                    {giochi.map(gioco => (
                        <Link to={`/game/${gioco.id}`} key={gioco.id} state={{gioco}}>
                            <GameCard key={gioco.id} gioco={gioco} />
                        </Link>
                    ))}
                </div>
            </div>

            <Footer></Footer>

            

        </>
    )
}

export default AllGames;