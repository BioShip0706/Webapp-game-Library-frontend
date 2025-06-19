import { useState } from "react"

function Pagination({currentPage, totalPages, onPageChange})
{


    const pages = [];

    for(let i = 1; i <= totalPages; i++)
    {
        pages.push(i);
    }

    return (
        <>

            <div>

                <button onClick={() => onPageChange(1)} disabled={currentPage === 1} style={{margin: "0 5px"}}>
                {"<<"} {/*Per andare all'inizio (pagina 1) */}
                </button>
            

            
                {pages.map(page => (
                    <button key={page} onClick={() => onPageChange(page)} style={{margin: "0 5px",fontWeight: page === currentPage ? "bold" : "normal", color: page === currentPage ? "red" : "black"}}>
                    {page}
                    </button>
                ))}

                <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} style={{margin: "0 5px"}}>
                {">>"} {/*Per andare all ultima pagina (pagina totalPages) */}
                </button>

            </div>

        </>
    )

}

export default Pagination