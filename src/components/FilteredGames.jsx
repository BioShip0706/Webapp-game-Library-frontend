import { useLocation, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import NavBar from "./NavBar";
import GameFilters from "./GameFilters";
import "./AllGames.css"
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";


function FilteredGames() 
{

    
    //Modifiche
    const navigate = useNavigate();
    const location = useLocation();
    
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1; //prendo dall'url la pagina altrimento setto a 1
    
    const [giochi,setGiochi] = useState([])
    
    const [currentPage, setCurrentPage] = useState(pageFromUrl);
    const [totalCount, setTotalCount] = useState(0);
    const gamesPerPage = 20;
    const totalPages = Math.ceil(totalCount / gamesPerPage) //arrotondo
    
    const { filterFavorites } = location.state || false;

    //link intero http://localhost:8080/game/filterGames?genreIds=1&platformIds=3&scoreOrder=asc&releaseDateOrder=desc&favoriteIds=1&page=0&perPage=10

    useEffect(() => 
    {
        const params = new URLSearchParams(location.search);
        const genreIds = params.get("genreIds"); //prende gli id, tipo 12,5,6
        const platformIds = params.get("platformIds");
        const scoreOrder = params.get("scoreOrder");
        const releaseDateOrder = params.get("releaseDateOrder");
        const favoriteIds = params.get("favoriteIds") || null;

        console.log("i platform ids sono: " , platformIds)

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

        if(scoreOrder)
        {
            queryParams.push(`scoreOrder=${scoreOrder}`);
        }

        if(releaseDateOrder)
        {
            queryParams.push(`releaseDateOrder=${releaseDateOrder}`);
        }

        if(favoriteIds)
        {
            queryParams.push(`favoriteIds=${favoriteIds}`);
        }

        queryParams.push(`page=${currentPage}`)
        queryParams.push(`perPage=${gamesPerPage}`)

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

        fetch(url).then((response) => response.json()).then((data) => {setGiochi(data.content); setTotalCount(data.totalElements)}).catch((error) => console.error("Errore fetch giochi:", error));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, location.search]);

    return (
        <>
            <NavBar />
            <div className="allgames-wrapper">


                    <GameFilters filterFavorites={filterFavorites} />

                    <div className="games-container">

                        {giochi.length === 0 ? (<div className="no-games-message">No games found!</div>) :
                        (giochi.map(gioco => (
                        //<Link to={`/game/${gioco.id}`} key={gioco.id} state={{gioco}}>
                            <GameCard key={gioco.id} gioco={gioco} />
                        //</Link>
                        )))}

                    </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}></Pagination>
            <Footer></Footer>

        </>
    );
}

export default FilteredGames;
