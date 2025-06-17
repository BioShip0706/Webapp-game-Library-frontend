import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./NavBar";
import GameFilters from "./GameFilters";
import "./GameFull.css"
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import FavoriteButton from "./FavoriteButton";

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
              throw new Error(text) // lancio l’errore con il messaggio dal server
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
        <div className="game-full">
        {error && (<p>{error}</p>)} 

        {!error && !game && (<p>Caricamento in corso...</p>)}

        {game && (
            <div className="game-details">
              <img src={game.imageURL} alt={game.title} className="game-image" />

              <div className="game-info">
                <h2>{game.title}</h2>
                <p><strong>Descrizione:</strong> {game.description}</p>
                <p><strong>Sviluppatore:</strong> {game.developer}</p>
                <p><strong>Pubblicato da:</strong> {game.publisher}</p>
                <p><strong>Data di uscita:</strong> {game.releaseDate}</p>
                <p><strong>Voto:</strong> {game.score}/10</p>

                <p><strong>Piattaforme:</strong> {game.platforms?.map(p => p.name).join(", ")}</p>
                <p><strong>Generi:</strong> {game.genres?.map(g => g.name).join(", ")}</p>
                
                {console.log(gameId)}
                {console.log("IL GIOCO ID è: " + gameId)}
                <FavoriteButton giocoId = {game.id} stile = "gameFullHeart"></FavoriteButton>

              </div>
            </div>
        )}

        </div>

        <Footer></Footer>
      </>
    );
}

export default GameFull;
