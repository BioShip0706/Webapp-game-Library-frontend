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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";


function SearchedGames()
{
  
    const [giochi,setGiochi] = useState([])
    
    //const {favoriteIds, setFavoriteIds, userId} = useContext(FavoriteContext)

    const navigate = useNavigate();
    const location = useLocation();

    
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1; //prendo dall'url la pagina altrimento setto a 1

    const titleFromUrl = searchParams.get("title") || null;


    const [currentPage, setCurrentPage] = useState(pageFromUrl);
    const [totalCount, setTotalCount] = useState(0);
    const gamesPerPage = 20;
    const totalPages = Math.ceil(totalCount / gamesPerPage) //arrotondo

    //recupero tutti i giochi (ancora no paginazione)
    // useEffect(() => 
    // {
    //     fetch(`http://localhost:8080/game/getAllFavoriteGames?userId=${userId}`).then(response => response.json()).then(data => setGiochi(data))
    // },[userId])

    useEffect(() => {

        console.log("Ho ricevuto questo titolo: " ,titleFromUrl)

        if(!titleFromUrl)
        {
            //navigate("/")
            return;
        }

        
        const url = `http://localhost:8080/game/filterGames?title=${encodeURIComponent(titleFromUrl)}&page=${currentPage}&perPage=${gamesPerPage}`;
        fetch(url)
        .then(response => response.json())
        .then(data => { setGiochi(data.content); setTotalCount(data.totalElements)});

        const expectedSearch = `?title=${titleFromUrl}&page=${currentPage}`;

        if (location.search !== expectedSearch) {
            navigate({ pathname: "/searchedGames", search: expectedSearch });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, navigate, titleFromUrl,location.search]);

    

   

    return(
        <>

            <Navbar></Navbar>
            

            <div className="allgames-wrapper">
                
                <GameFilters  title = {titleFromUrl}/>
                
                <div className="games-container">
                    {giochi.length === 0 ? (<div className="no-games-message">No games found with that name</div>) :
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
    )
}


export default SearchedGames;