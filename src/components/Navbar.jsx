import React from "react";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
        <nav className="navbar">
            <a href="/" className="logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Video-Game-Controller-Icon-D-Edit.svg/640px-Video-Game-Controller-Icon-D-Edit.svg.png"
                alt="Controller Icon"
                className="icon-controller"
              />
              <span>GAME LIBRARY</span>
              
            </a>

            {/* <div className="search-container">
              <input type="search" placeholder="Cerca giochi..." />
            </div> */}

           
            <SearchBar></SearchBar>
          
            
            

            <Link to="/register">
              <div className="btn-login">
              <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="User Icon" className="icon-user" />
              Accedi
              </div>
            </Link>


        </nav>

          
    </>
    

  );
}

export default Navbar;
