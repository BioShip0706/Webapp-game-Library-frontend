import { useState } from "react"

import "./Pagination.css"

function Pagination({currentPage, totalPages, onPageChange})
{


    const pages = [];

    for(let i = 1; i <= totalPages; i++)
    {
        pages.push(i);
    }

    return (
        <>

            <div className="pagination-container">

                <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                {"<<"} {/*Per andare all'inizio (pagina 1) */}
                </button>
            

            
                {pages.map(page => (
                    <button key={page} onClick={() => onPageChange(page)} className={page === currentPage ? "active" : ""}>
                    {page}
                    </button>
                ))}

                <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                {">>"} {/*Per andare all ultima pagina (pagina totalPages) */}
                </button>

            </div>

        </>
    )

}

export default Pagination