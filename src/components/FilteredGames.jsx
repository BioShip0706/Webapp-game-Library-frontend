import { useLocation, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import NavBar from "./NavBar";
import GameFilters from "./GameFilters";
import "./AllGames.css"
import Footer from "./Footer";

function FilteredGames() 
{
    const [giochi, setGiochi] = useState([]);
    const location = useLocation();

    useEffect(() => 
    {
        const params = new URLSearchParams(location.search);
        const genreIds = params.get("genreIds"); //prende gli id, tipo 12,5,6
        const platformIds = params.get("platformIds");

        //se arrivo dal filtro
        //const {generiSelezionati, piattaformeSelezionate} = location.state || {}; //se ci sono altrimenti inizializzali vuoti

        let url = "http://localhost:8080/game/filterGames?";

        const queryParams =[];

        if(genreIds)
        {
            queryParams.push(`genreIds=${genreIds}`);
        }

        if(platformIds)
        {
            queryParams.push(`platformIds=${platformIds}`);
        }

        //con stato

        // if(Array.isArray(generiSelezionati) && generiSelezionati.length > 0) 
        // {
        //     queryParams.push(`genreIds=${generiSelezionati}`);
        // }

        // if(Array.isArray(piattaformeSelezionate) && piattaformeSelezionate.length > 0)
        // {
        //     queryParams.push(`platformIds=${piattaformeSelezionate}`);
        // }

        url += queryParams.join("&"); //ogni elemento di questo array viene aggiunto all'url con un & alla fine
        console.log(url)

        fetch(url).then((response) => response.json()).then((data) => setGiochi(data)).catch((error) => console.error("Errore fetch giochi:", error));

    }, [location.search,location.state]);

    return (
        <>
            <NavBar />
            <div className="allgames-wrapper">


                    <GameFilters />

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
    );
}

export default FilteredGames;
