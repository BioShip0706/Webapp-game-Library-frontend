import { AuthContext } from '../store/AuthContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EditGameButton({gameId, stile})
{
    const {isAdmin} = useContext(AuthContext)
    const navigate = useNavigate();

    if(!isAdmin)
    {
        return null;
    }

    function handleEdit(e)
    {
        e.preventDefault(); //blocco la navigazione del Link To 
        e.stopPropagation(); //impedisco diffusione di effetto
        navigate('/gameForm', { state: { gameId: gameId, action: "EDIT" } });
        console.log("hai cliccato edit")
    }

    return(
        <>
            {/* <Link to={`/gameForm`} key={gameId} className={stile} gameId={gameId}>EDIT 🖋️</Link> */}

            <button className={stile} onClick={handleEdit}>EDIT 🖋️</button>

        </>
    )
}

export default EditGameButton