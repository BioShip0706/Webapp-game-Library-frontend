import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./NavBar";
import GameFilters from "./GameFilters";
import "./GameFull.css"
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import FavoriteButton from "./FavoriteButton";
import EditGameButton from "./EditGameButton";
import DeleteGameButton from "./DeleteGameButton";

function GameFull() 
{
  // const location = useLocation();
  // const gioco = location.state.gioco;

  // if (!gioco) {
  //   return <p>Nessun dato ricevuto. Ritorna alla lista.</p>; //SISTEMARE SE SI VA MANUALMENTE AL LINK useLocation non ha niente dentro e da errore, usare un fetch
  // }

    const {gameId} = useParams();
    const [game,setGame] = useState([]);
    const [error,setError] = useState(null)

    // useEffect(() => 
    // {
    //   fetch(`http://localhost:8080/game/getGameById/${gameId}`).then(response => response.json()).then(data => setGame(data))
    // },[])

    useEffect(() => 
    {
        fetch(`http://localhost:8080/game/getGameById/${gameId}`)
        .then(response => {
          if (!response.ok) { 
            // se lo status è diverso da 2xx
            return response.text().then(text => {
              throw new Error(text) // lancio l’errore 
            });
          }
          return response.json(); // altrimenti leggo i dati JSON del gioco
        })
        .then(data => {
          setGame(data); // salvo il gioco
          setError(null); // cancello eventuali errori precedenti
        })
        .catch(err => {
          setError(err.message); // salvo il messaggio di errore
          setGame(null); // cancello eventuali dati gioco
        });
    }, [gameId]);

    //&& sta per true, senza contrparte false
    return (
      <>
        <Navbar />
        <div className="gameFullContainer">
        {error && <p className="no-games-message">{error}</p>}
        {!error && !game && <p>Caricamento in corso...</p>}

        {game && (
          <div className="gameFullContent">
            <img
              src={game.imageURL}
              alt={game.title}
              className="gameFullImage"
            />

            <div className="gameFullInfo">

              <div className="gameFullHeader">

                <div className="gameTitle">
                  <h1>{game.title}</h1>
                </div>
              
                <div className="gameFullButtons">
                  <FavoriteButton giocoId={game.id} stile="gameFullHeart" />
                  <EditGameButton gameId={game.id} stile="gameFullEdit" />
                  <DeleteGameButton gameId={game.id} stile="gameFullDelete"/>
                </div>
                
              </div>

              

              <div className="gameFullDetails">
                <p><strong>Developer:</strong> {game.developer}</p>
                <p><strong>Publisher:</strong> {game.publisher}</p>
                <p><strong>Release Date:</strong> {game.releaseDate}</p>
                <p><strong>Score:</strong> {game.score}/10</p>
                <p><strong>Platforms:</strong> {game.platforms?.map(p => p.name).join(", ")}</p>
                <p><strong>Genres:</strong> {game.genres?.map(g => g.name).join(", ")}</p>
              </div>

              <p className="gameFullDescription">{game.description}</p>

            </div>
          </div>
        )}
      </div>

        <Footer></Footer>
      </>
    );
}

export default GameFull;
