
import { AuthContext } from '../store/AuthContext';
import { useContext } from 'react';
function DeleteGameButton({gameId})
{

    const {isAdmin} = useContext(AuthContext)

    if(!isAdmin)
    {
        return null;
    }

    function handleDelete(e)
    {
        e.preventDefault(); //blocco la navigazione del Link To 
        e.stopPropagation(); //impedisco diffusione di effetto 
        console.log("hai cliccato delete")
    }

    return(
        <>
            <button className="gioco-delete" onClick={handleDelete}>DELETE ❌</button>

        </>
    )
}

export default DeleteGameButton;