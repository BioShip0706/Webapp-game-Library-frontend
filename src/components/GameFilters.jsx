import { useEffect } from "react";
import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./GameFilters.css"





function GameFilters()
{


    const [generi, setGeneri] = useState([])
    // const [generiSelezionati, setGeneriSelezionati] = useState([]);

    const [piattaforme, setPiattaforme] = useState([])
    //const [piattaformeSelezionate, setPiattaformeSelezionate] = useState([]);

    //provo a riprendere i filtri se ci sono
    const location = useLocation();
    const { generiSelezionati: inizialiGeneri = [], piattaformeSelezionate: inizialiPiattaforme = [] } = location.state || {}; //dallo state prendo generiSelezionati e lo metto dentro una variabile array vuoto [], e poi prendo dallo state

    const [generiSelezionati, setGeneriSelezionati] = useState(inizialiGeneri);
    const [piattaformeSelezionate, setPiattaformeSelezionate] = useState(inizialiPiattaforme);

    const navigate = useNavigate();

    function handleSelezioneGenere(e)
    {
        const selectedGenre = e.target.value; //prendo per esempio "Horror" però il value in questo caso è l'id del genere,

        if(selectedGenre !== "" && !generiSelezionati.includes(selectedGenre) && generiSelezionati.length < 3) //se non è già dentro l'array salvo l'id all'interno
        {
          setGeneriSelezionati([...generiSelezionati, selectedGenre])
        }
        e.target.value = ""; //rimetto a valore vuoto ""

    }

    function handleSelezionePiattaforma(e)
    {
        const selectedPlatform = e.target.value; //prendo per esempio "Horror" però il value in questo caso è l'id del genere,

        if(selectedPlatform !== "" && !piattaformeSelezionate.includes(selectedPlatform) && piattaformeSelezionate.length < 3) //se non è già dentro l'array salvo l'id all'interno
        {
          setPiattaformeSelezionate([...piattaformeSelezionate, selectedPlatform])
        }
        e.target.value = ""; //rimetto a valore vuoto ""

    }

    useEffect(() => 
    {
        fetch("http://localhost:8080/genre/getAllGenres").then(response => response.json()).then(data => setGeneri(data))
    },[])

    useEffect(() => 
    {
        fetch("http://localhost:8080/platform/getAllPlatforms").then(response => response.json()).then(data => setPiattaforme(data))
    },[])


    function handleFiltroGiochi()
    {
        const queryString = `?genreIds=${generiSelezionati.join(",")}&platformIds=${piattaformeSelezionate.join(",")}`;

        navigate(
            {
                pathname: "/game/filters",
                search: queryString,
            },
            {
                state: {generiSelezionati: generiSelezionati, piattaformeSelezionate: piattaformeSelezionate},
            }
        );

    }

    function handleCleanFiltri()
    {
        setGeneriSelezionati([]);
        setPiattaformeSelezionate([]);
        navigate("/");
    }


    return(
        <>
            <div  className="filters-wrapper">
                <label>Generi:</label>
                <select onChange={handleSelezioneGenere} defaultValue="" disabled={generiSelezionati.length >= 3}>

                    <option value="">-- Seleziona un genere --</option>

                    {generi.map(genere => (
                        <option key={genere.id} value={genere.id}>
                            {genere.name}
                        </option>
                    ))}

                </select>
                
    
                {/*<p>Generi selezionati: </p>*/}
                <ul>
                    {generiSelezionati.map(id => {
                        const genere = generi.find(g => g.id == id);
                        return <li key={id} className="selectedGenre">{genere ? genere.name : "Sconosciuto"}</li>;
                    })}
                </ul>

            


            
                <label>Piattaforme:</label>
                <select onChange={handleSelezionePiattaforma} defaultValue="" disabled={piattaformeSelezionate.length >= 3}>

                    <option value="">-- Seleziona una piattaforma --</option>

                    {piattaforme.map(piattaforma => (
                        <option key={piattaforma.id} value={piattaforma.id}>
                            {piattaforma.name}
                        </option>
                    ))}

                </select>

                {/*<p>Piattaforme selezionate: </p>*/}
                <ul>
                    {piattaformeSelezionate.map(id => {
                        const piattaforma = piattaforme.find(g => g.id == id);
                        return <li key={id} className="selectedPlatform">{piattaforma ? piattaforma.name : "Sconosciuto"}</li>;
                    })}
                </ul>

                {/* <Link to="/game/filters" state={{generiSelezionati: generiSelezionati, piattaformeSelezionate: piattaformeSelezionate}}>
                    <button disabled={generiSelezionati >= 3 || piattaformeSelezionate >= 3}>Filtra Giochi</button>
                </Link> */}

                {/* <Link to={{pathname: "/game/filters", search: `?genreIds=${generiSelezionati.join(",")}&platformIds=${piattaformeSelezionate.join(",")}`}} state={{generiSelezionati: generiSelezionati, piattaformeSelezionate: piattaformeSelezionate}}> 
                    <button className="filter-button"  disabled={generiSelezionati.length < 1 && piattaformeSelezionate.length < 1}>Filtra Giochi</button>
                </Link> */}

                <button className="clean-button" onClick={handleCleanFiltri}  disabled={generiSelezionati.length < 1 && piattaformeSelezionate.length < 1}>Pulisci Filtri</button>
               
                <button className="filter-button" onClick={handleFiltroGiochi}  disabled={generiSelezionati.length < 1 && piattaformeSelezionate.length < 1}>Filtra Giochi</button>
                

            </div>
        
        </>
    )
}

export default GameFilters;