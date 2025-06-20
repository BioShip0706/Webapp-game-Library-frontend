import { useLocation } from "react-router-dom"


function GameForm()
{
    const location = useLocation();
    const {gameId, action} = location.state || {};

    //In base all'action ritornare cose diverse

    return(
        <>
            {console.log("Ho ricevuto l'id ", gameId)}
        </>
    )
}

export default GameForm