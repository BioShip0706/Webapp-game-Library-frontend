import { useState } from "react";
import { useEffect } from "react";
import "./Test.css"

function Test()
{
    const [generi, setGeneri] = useState([])
    const [generiSelezionati, setGeneriSelezionati] = useState([]);

    const [piattaforme, setPiattaforme] = useState([])
    const [piattaformeSelezionate, setPiattaformeSelezionate] = useState([]);

    const [giochi,setGiochi] = useState([])


    useEffect(() => 
    {
        fetch("http://localhost:8080/genre/getAllGenres").then(response => response.json()).then(data => setGeneri(data))
    },[])

    useEffect(() => 
    {
        fetch("http://localhost:8080/platform/getAllPlatforms").then(response => response.json()).then(data => setPiattaforme(data))
    },[])

    //recupero tutti i giochi (ancora no paginazione)
    useEffect(() => 
    {
        fetch("http://localhost:8080/game/getAllGames").then(response => response.json()).then(data => setGiochi(data))
    },[])

    function handleSelezioneGenere(e)
    {
        const selectedGenre = e.target.value; //prendo per esempio "Horror" però il value in questo caso è l'id del genere,

        if(selectedGenre !== "" && !generiSelezionati.includes(selectedGenre)) //se non è già dentro l'array salvo l'id all'interno
        {
          setGeneriSelezionati([...generiSelezionati, selectedGenre])
        }
        e.target.value = ""; //rimetto a valore vuoto ""

    }

    function handleSelezionePiattaforma(e)
    {
        const selectedPlatform = e.target.value; //prendo per esempio "Horror" però il value in questo caso è l'id del genere,

        if(selectedPlatform !== "" && !piattaformeSelezionate.includes(selectedPlatform)) //se non è già dentro l'array salvo l'id all'interno
        {
          setPiattaformeSelezionate([...piattaformeSelezionate, selectedPlatform])
        }
        e.target.value = ""; //rimetto a valore vuoto ""

    }

    // useEffect(() => {
    //     console.log("Generi selezionati: " , generiSelezionati);
    // },[generiSelezionati])

    return(
        <>
            <div>
                <label>Generi:</label>
                <select onChange={handleSelezioneGenere} defaultValue="">

                    <option value="">-- Seleziona un genere --</option>

                    {generi.map(genere => (
                        <option key={genere.id} value={genere.id}>
                            {genere.name}
                        </option>
                    ))}

                </select>
                
    
                <p>Generi selezionati: </p>
                <ul>
                    {generiSelezionati.map(id => {
                        const genere = generi.find(g => g.id == id);
                        return <li key={id}>{genere ? genere.name : "Sconosciuto"}</li>;
                    })}
                </ul>

            </div>


            <div>
                <label>Piattaforme:</label>
                <select onChange={handleSelezionePiattaforma} defaultValue="">

                    <option value="">-- Seleziona una piattaforma --</option>

                    {piattaforme.map(piattaforma => (
                        <option key={piattaforma.id} value={piattaforma.id}>
                            {piattaforma.name}
                        </option>
                    ))}

                </select>

                <p>Piattaforme selezionate: </p>
                <ul>
                    {piattaformeSelezionate.map(id => {
                        const piattaforma = piattaforme.find(g => g.id == id);
                        return <li key={id}>{piattaforma ? piattaforma.name : "Sconosciuto"}</li>;
                    })}
                </ul>

            </div>

            <div className="container">
                {giochi.map(gioco => (
                    <div key={gioco.id} className="gioco">
                    <img src={gioco.imageURL} alt={gioco.title} />
                    <h2>{gioco.title}</h2>
                    <p>Sviluppatore: {gioco.developer}</p>
                    <p>Voto: {gioco.score}</p>
                    </div>
                ))}
            </div>

            

        </>
    )
}

export default Test;