import { useState } from "react";
import { useEffect } from "react";
import "./AllGames.css"
import Navbar from "./Navbar";
import GameCard from "./GameCard";
import GameFilters from "./GameFilters";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

function AllGames()
{
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page")) || 1; //prendo dall'url la pagina altrimento setto a 1

    const [giochi,setGiochi] = useState([])

    const [currentPage, setCurrentPage] = useState(pageFromUrl);
    const [totalCount, setTotalCount] = useState(0);
    const gamesPerPage = 20;
    const totalPages = Math.ceil(totalCount / gamesPerPage)


    

    //recupero tutti i giochi (ancora no paginazione)
    // useEffect(() => 
    // {
    //     fetch("http://localhost:8080/game/getAllGames").then(response => response.json()).then(data => setGiochi(data))
    // },[])
 
    //Con paginazione
    useEffect(() => 
    {
      fetch(`http://localhost:8080/game/getAllGameCardsByPage?page=${currentPage}&perPage=${gamesPerPage}`)
      .then(res => res.json())
      .then(data => {setGiochi(data.content); setTotalCount(data.totalElements)}) //dall'object ritornato da Page, letto dlala console, content è il json con i giochi, totalElements è 30 (esempio)
      .catch(err => console.error("Errore nel fetch dei giochi:", err));

      navigate({pathname: "/", search: `page=${currentPage}`})
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage,navigate]);

    

   

    return(
        <>

            <Navbar></Navbar>
            

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
            
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}></Pagination>
            <Footer></Footer>

            

        </>
    )
}

export default AllGames;