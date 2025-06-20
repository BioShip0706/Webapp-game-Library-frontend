
import { AuthContext } from '../store/AuthContext';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function DeleteGameButton({gameId, stile})
{

    const {isAdmin, jwtToken} = useContext(AuthContext)
    const navigate = useNavigate();

    const [conferma,setConferma] = useState(false);

    if(!isAdmin)
    {
        return null;
    }

    function handleDelete(e)
    {
        e.preventDefault(); //blocco la navigazione del Link To 
        e.stopPropagation(); //impedisco diffusione di effetto 

        if(!conferma)
        {
            setConferma(true)
            setTimeout(() => setConferma(false), 3000);
            return;
        }


        fetch(`http://localhost:8080/game/deleteGameById?gameId=${gameId}`, 
            {method: 'DELETE',
             headers: {'Authorization': `Bearer ${jwtToken}`}
            }).then(() => {navigate(0)}).catch(err => console.error("Errore nel delete:", err.message));
        

    }

    return(

        <>
            {/* <Link to={`/gameForm`} key={gameId} className={stile}>DELETE ❌</Link> */}
             <button className={stile} onClick={handleDelete}>
                {conferma ? "CONFIRM DELETE ❌" : "DELETE ❌"}
             </button>

        </>
    )
}

export default DeleteGameButton;