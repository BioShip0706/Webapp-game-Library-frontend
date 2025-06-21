import { useLocation } from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer"
import { useEffect, useState } from "react";
import "./GameForm.css"
import { AuthContext } from '../store/AuthContext';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GameForm()
{
    
    const {isAdmin, jwtToken} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin === false) 
        {
            navigate("/", { replace: true }); // oppure navigate("/login") se preferisci
        }
    }, [isAdmin, navigate]);

    const location = useLocation();
    const {gameId, action} = location.state || {};




    


    

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [score, setScore] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedGenres, setSelectedGenre] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const [newGameUrl,setNewGameUrl] = useState(null);

    const[existingGameId,setExistingGameId] = useState(null);


    // const [platformOptions, setPlatformOptions] = useState([]); // Riempili da backend o mock
    // const [genreOptions, setGenreOptions] = useState([]);       // Riempili da backend o mock

    //In base all'action ritornare cose diverse

    useEffect(() =>{



        fetch("http://localhost:8080/genre/getAllGenres").then(response => response.json()).then(data => setGenres(data)) //prendo in ogni caso tutti i generi

        fetch("http://localhost:8080/platform/getAllPlatforms").then(response => response.json()).then(data => setPlatforms(data)) //prendo  tutti le piattaforme

        if(action === "EDIT" && gameId)
        {
            setExistingGameId(null)

            fetch(`http://localhost:8080/game/getGameById/${gameId}`)
            .then(response => {
                if (!response.ok) 
                { 
                    // se lo status è diverso da 2xx
                    return response.text().then(text => {
                    throw new Error(text) // lancio l’errore con il messaggio dal server
                    });
                }
                return response.json(); // altrimenti leggo i dati JSON del gioco
            })
            .then(data => {
                setTitle(data.title || "");
                setDescription(data.description || "");
                setDeveloper(data.developer || "");
                setPublisher(data.publisher || "");
                setReleaseDate(data.releaseDate || "");
                setScore(data.score || "");
                setImageURL(data.imageURL || "");
                setSelectedPlatforms(data.platforms ? data.platforms.map(platform => platform.id) : []);
                setSelectedGenre(data.genres ? data.genres.map(genre => genre.id) : []);
                
                
            })
            .catch(err => {
                    console.error(err);
                    setErrorMessage("Error getting game data");
            });


        }
        else if(action === "ADD")
        {
            console.log("ricevuto un add")
            //ADD: resetta i campi
            setTitle("");
            setDescription("");
            setDeveloper("");
            setPublisher("");
            setReleaseDate("");
            setScore("");
            setImageURL("");
            setSelectedPlatforms([]);
            setSelectedGenre([]);
        }



    },[action,gameId])

    function handlePlatformSelection(e)
    {
        const id = Number(e.target.value);

        if(e.target.checked)
        {
            setSelectedPlatforms(prev => [...prev,id]) //prendo l'ultimo aggiornmento per evitare desync
        }
        else
        {
            setSelectedPlatforms(prev => prev.filter(p => p !== id)); //prendi tutte le piattaforme selezionate e rimuovi quella dove l'id è uguale a quella che ho appena scelto
        }

        //console.log(selectedPlatforms)
    }

    function handleGenreSelection(e)
    {
        const id = Number(e.target.value);

        if(e.target.checked)
        {
            setSelectedGenre(prev => [...prev,id]) //prendo l'ultimo aggiornmento per evitare desync
        }
        else
        {
            setSelectedGenre(prev => prev.filter(p => p !== id)); 
        }

        //console.log(selectedGenres)

    }

    function checkTitle() //come finisco di scrivere il titolo viene chiamato
    {

        if(action !== "ADD" || !title.trim())
        {
            console.log("sei in edit");
            return;
        }

        fetch(`http://localhost:8080/game/getGameIdByTitle?title=${title}`)
        .then(response => {
            if (!response.ok) 
            {
                throw new Error("Response not ok")
            }
            return response.text(); // anche se è Long, arriva come stringa
        })
        .then(data => {
            const existingGameId = parseInt(data);


            if (isNaN(existingGameId)) 
            {
                setExistingGameId(null);
            } 
            else 
            {
                setExistingGameId(existingGameId);
            }

            
        })
        .catch( err => {
            setExistingGameId(null);
        })

    }



    function handleSubmit(e)
    {
        e.preventDefault();
        const gameRequest = {
            title,
            description,
            developer,
            publisher,
            releaseDate,
            score: parseFloat(score),
            imageURL,
            platformsIds: selectedPlatforms, // lista di id  1,2,3,4,5
            genresIds: selectedGenres
        };

        let fetchMethod;

        if(action === "EDIT")
        {
            fetchMethod = "PUT"
        }
        else if(action === "ADD")
        {
            fetchMethod = "POST"
        }

        const url = action === "EDIT" ? `http://localhost:8080/game/editGameById?gameId=${gameId}` : `http://localhost:8080/game/addNewGame`;

        fetch(url,{
            method: fetchMethod, //se devo editare passa PUT, altrimenti POST (per add)
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(gameRequest)
            
        })
        .then(response => {

            if(!response.ok)
            {
                return response.text().then(errorText => { //ritorna sempre una stringa (backend -  response entity body)
                    console.log(errorText);
                    setErrorMessage(errorText);
                    throw new Error(errorText);
                });
            }

            if(fetchMethod === "POST")
            {
                return response.json(); //Per add game, se va a buon fine ritorno l'id del gioco appena inserito
            }
            else if( fetchMethod === "PUT")
            {
                return response.text();
            }

        })
        .then(data => {
            if(fetchMethod === "POST")
            {
                setErrorMessage("");
                setNewGameUrl(`/game/${data}`)
            }
            else if(fetchMethod === "PUT")
            {
                setErrorMessage("")
                alert(data);
            }

        })
        .catch(err => {
        setErrorMessage(err.message || "Error during request");
    });

    }

    return(
        <>
            <Navbar></Navbar>

            <div className="game-form-container">

                <div className="game-form-box">

                

                    <form onSubmit={handleSubmit}>

                        <div className="gameform-title-header">
                            <h2>{action === "EDIT" ? "Edit Game" : "Add new game"}</h2>
                        </div>

                        <div className="gameform-input-group">
                            <label>Title</label>
                            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value); setExistingGameId(null)}} onBlur={checkTitle} required /> {/*Quando finisco di scrivere controllo se esiste. Se sì, passo a Edit*/}

                            {/* {existingGameId && 
                                <button className="gameform-game-found" type="button" onClick={() => navigate('/gameForm', { state: { gameId: existingGameId, action: "EDIT" } })}>
                                    "<b><u>{title}</u></b>" found. Switch to edit.
                                </button>
                            } */}

                            {action === "ADD" && existingGameId ? (
                                <button className="gameform-game-found" type="button" onClick={() => navigate('/gameForm', { state: { gameId: existingGameId, action: "EDIT" } })}>
                                    "<b><u>{title}</u></b>" found. Switch to edit.
                                </button>)
                                : action === "ADD" && 
                                (<span>If an EXACT match is found, the edit button will appear here instead</span>)}

                        </div>



                        <div className="gameform-input-group">
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className="gameform-input-group">
                            <label>Developer</label>
                            <input type="text" value={developer} onChange={(e) => setDeveloper(e.target.value)} required />
                        </div>

                        <div className="gameform-input-group">
                            <label>Publisher</label>
                            <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
                        </div>

                        <div className="gameform-input-group">
                            <label>Release Date</label>
                            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                        </div>

                        <div className="gameform-input-group">
                            <label>Score</label>
                            <input type="number" min="0" max="10" step="0.1" value={score} onChange={(e) => setScore(e.target.value)} required />
                        </div>

                        <div className="gameform-input-group">
                            <label>Image URL</label>
                            <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
                        </div>

                        {imageURL && (
                            <div className="gameform-image-preview">
                                <img src={imageURL} alt="PHOTO PREVIEW HERE" />
                            </div>
                        )}


                        <div className="gameform-input-group">
                            <label>Platforms</label>
                            <div className="gameform-checkbox-group">
                                {platforms.map(platform => (
                                <label key={platform.id}>
                                 <input type="checkbox" value={platform.id} checked={selectedPlatforms.includes(platform.id)} onChange={handlePlatformSelection}/>
                                 <span>{platform.name}</span>
                                </label>
                                ))}
                            </div>
                        </div>

                        <div className="gameform-input-group">
                            <label>Genres</label>
                            <div className="gameform-checkbox-group">
                                {genres.map(genre => (
                                <label key={genre.id}>
                                 <input type="checkbox" value={genre.id} checked={selectedGenres.includes(genre.id)} onChange={handleGenreSelection}/>
                                 {genre.name}
                                </label>
                                ))}
                            </div>
                        </div>
                        
                        

                        {newGameUrl && (
                            <div className="gameform-new-game-created">
                                {newGameUrl && <a href={newGameUrl} target="_blank">NEW GAME CREATED: {newGameUrl} </a>}
                            </div>
                        )}

                        {errorMessage && <p className="gameform-error-message">{errorMessage}</p>}

                        <button type="submit" className="gameform-submit-button">Submit</button>
                    </form>

                </div>

            </div>

            <Footer></Footer>
            
        </>
    )
}

export default GameForm