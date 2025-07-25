import { useEffect } from "react";
import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FavoriteContext } from "../store/FavoriteContext";
import { useContext } from "react";
import "./GameFilters.css"





function GameFilters({filterFavorites, title}) //li ricevo indietro ogni volta
{
    //console.log(title)

    const {favoriteIds} = useContext(FavoriteContext)

    const [generi, setGeneri] = useState([])
    // const [generiSelezionati, setGeneriSelezionati] = useState([]);

    const [piattaforme, setPiattaforme] = useState([])
    //const [piattaformeSelezionate, setPiattaformeSelezionate] = useState([]);

    //provo a riprendere i filtri se ci sono
    const location = useLocation();

    const { generiSelezionati: inizialiGeneri = [],  
        piattaformeSelezionate: inizialiPiattaforme = [], 
        scoreOrder: scoreIniziale = "", 
        releaseDateOrder: releaseIniziale = ""} = location.state || {}; //dallo state prendo questi campi , altrimenti inizializzo  con {})


    const [generiSelezionati, setGeneriSelezionati] = useState(inizialiGeneri);
    const [piattaformeSelezionate, setPiattaformeSelezionate] = useState(inizialiPiattaforme);

    const [scoreOrder, setScoreOrder] = useState(scoreIniziale);
    const [releaseDateOrder,setReleaseDateOrder] = useState(releaseIniziale);

    //const [titolo, setTitolo] = useState(title);

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
        const selectedPlatform = e.target.value; //prendo per esempio "SWITCH" però il value in questo caso è l'id della piattaforma,

        if(selectedPlatform !== "" && !piattaformeSelezionate.includes(selectedPlatform) && piattaformeSelezionate.length < 3) //se non è già dentro l'array salvo l'id all'interno
        {
          setPiattaformeSelezionate([...piattaformeSelezionate, selectedPlatform])
        }
        e.target.value = ""; //rimetto a valore vuoto ""

    }


    function handleSelezioneValutazione(e)
    {
        const selectScoreOrder = e.target.value; 

        console.log(selectScoreOrder)
        setScoreOrder(selectScoreOrder);

    }

    function handleSelezioneDataRilascio(e)
    {
        const selectedReleaseOrder = e.target.value; 

        console.log(selectedReleaseOrder)
        setReleaseDateOrder(selectedReleaseOrder);

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
        let queryString = `?genreIds=${generiSelezionati.join(",")}&platformIds=${piattaformeSelezionate.join(",")}&scoreOrder=${scoreOrder}&releaseDateOrder=${releaseDateOrder}`;
        console.log("Filter favorite è " + filterFavorites)

        if(filterFavorites)
        {
            queryString += `&favoriteIds=${favoriteIds}`;
            console.log("Favorites Idsss: ", favoriteIds)
        }

        if(title)
        {
            queryString += `&title=${encodeURIComponent(title)}`; //Breath of diventa Breath%20of
        }

        console.log("QueryString è " + queryString)

        navigate(
            {
                pathname: "/game/filters",
                search: queryString,
            },
            {
                state: {generiSelezionati: generiSelezionati, piattaformeSelezionate: piattaformeSelezionate, scoreOrder: scoreOrder, releaseDateOrder: releaseDateOrder, filterFavorites: filterFavorites, title: title},
            }
        );

    }

    function handleCleanFiltri()
    {
        setGeneriSelezionati([]);
        setPiattaformeSelezionate([]);
        setScoreOrder("");
        setReleaseDateOrder("");

        if(filterFavorites)
        {
            navigate("/favorites")
            return;
        }
        
        navigate("/");
    }


    return(
        <>
            <div  className="filters-wrapper">

                <label>Genres:</label>
                <select onChange={handleSelezioneGenere} defaultValue="" disabled={generiSelezionati.length >= 3}>

                    <option value="">-- Select a genre --</option>

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

            


            
                <label>Platforms:</label>
                <select onChange={handleSelezionePiattaforma} defaultValue="" disabled={piattaformeSelezionate.length >= 3}>

                    <option value="">-- Select a platform --</option>

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


                <label>Score:</label>
                <select onChange={handleSelezioneValutazione}  value={scoreOrder}>

                    <option value="">-- No order --</option>
                    <option value="asc">-- Ascending order --</option>
                    <option value="desc">-- Descending order --</option>
                    

                </select>

                <label>Release Year:</label>
                <select onChange={handleSelezioneDataRilascio} value={releaseDateOrder}>

                    <option value="">-- No order --</option>
                    <option value="asc">-- Ascending order --</option>
                    <option value="desc">-- Descending order --</option>
                    

                </select>

                {/* <Link to="/game/filters" state={{generiSelezionati: generiSelezionati, piattaformeSelezionate: piattaformeSelezionate}}>
                    <button disabled={generiSelezionati >= 3 || piattaformeSelezionate >= 3}>Filtra Giochi</button>
                </Link> */}

                {/* <Link to={{pathname: "/game/filters", search: `?genreIds=${generiSelezionati.join(",")}&platformIds=${piattaformeSelezionate.join(",")}`}} state={{generiSelezionati: generiSelezionati, piattaformeSelezionate: piattaformeSelezionate}}> 
                    <button className="filter-button"  disabled={generiSelezionati.length < 1 && piattaformeSelezionate.length < 1}>Filtra Giochi</button>
                </Link> */}

                <button className="clean-button" onClick={handleCleanFiltri}  disabled={generiSelezionati.length < 1 && piattaformeSelezionate.length < 1 && scoreOrder == "" && releaseDateOrder == ""}>Reset filters</button>
               
                <button className="filter-button" onClick={handleFiltroGiochi}  disabled={generiSelezionati.length < 1 && piattaformeSelezionate.length < 1 && scoreOrder == "" && releaseDateOrder == ""}>FILTER GAMES</button>
                

            </div>
        
        </>
    )
}

export default GameFilters;