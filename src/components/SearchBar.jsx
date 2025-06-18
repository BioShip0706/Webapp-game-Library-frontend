import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.css"


function SearchBar()
{

    const [games,setGames] = useState([])

    const [letters,setLetters] = useState("")

    const navigate = useNavigate();

    function typeLetter(e)
    {
        const letteraInserita = e.target.value
        //console.log("Da console:" + letteraInserita)
        setLetters(letteraInserita);
        //console.log("Da stato:" + letters)
    }

    function submitRedirectClean(e)
    {
        e.preventDefault()
        if(games.length > 0)
        {
            navigate(`/game/${games[0].id}`)
        }
        setGames([]);
    }

    function clickCleanGame(e)
    {
        e.preventDefault()
        setGames([]);
    }

    useEffect (() => 
    {
        if (letters.trim() === "") 
        {
            setGames([]); // resetto lista se input vuoto
            return;
        }

        fetch(`http://localhost:8080/game/searchGame/${letters}`).then(response => response.json()).then(data => setGames(data));

    },[letters])

    return (

        <>

            <div className="search-container" onSubmit={submitRedirectClean}>
                <form>
                <input type="search" placeholder="Cerca giochi..." onChange={typeLetter} value = {letters}/>
                </form>
            </div>

            <div className="results-list">
                <form onClick={clickCleanGame}>
                    {games.map(game => (
                        <Link key={game.id} to={`/game/${game.id}`} className="result-item">
                            <div className="result-left">{game.title}</div>
                            <div className="result-right">
                                <span>{game.developer}</span>
                                <span>{new Date(game.releaseDate).getFullYear()}</span>
                            </div>
                        </Link>
                    ))}
                </form>

            </div>

        </>
    )

}

export default SearchBar;