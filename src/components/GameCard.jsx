
import "./GameCard.css";

function GameCard({gioco})
{
    return (
        <>
                    <div key={gioco.id} className="gioco">
                    <img src={gioco.imageURL} alt={gioco.title} />
                    <h2>{gioco.title}</h2>
                    <p>Sviluppatore: {gioco.developer}</p>
                    <p>Voto: {gioco.score}</p>
                    </div>
        
        </>
    )
}

export default GameCard;