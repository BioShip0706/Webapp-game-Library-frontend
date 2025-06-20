import { AuthContext } from '../store/AuthContext';
import { useContext } from 'react';

function EditGameButton({gameId})
{
    const {isAdmin} = useContext(AuthContext)

    if(!isAdmin)
    {
        return null;
    }

    function handleEdit(e)
    {
        e.preventDefault(); //blocco la navigazione del Link To 
        e.stopPropagation(); //impedisco diffusione di effetto 
        console.log("hai cliccato edit")
    }

    return(
        <>
            <button className="gioco-edit" onClick={handleEdit}>EDIT 🖋️</button>

        </>
    )
}

export default EditGameButton