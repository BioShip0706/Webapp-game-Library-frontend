import React, { useEffect, useState } from "react";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { FavoriteContext } from "../store/FavoriteContext";

function Navbar() 
{

  const [username,setUsername] = useState(null);
  const [dropdownOpen,setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {setUserId} = useContext(FavoriteContext)


  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  },[location]) //il navigate aggiorna la loction quindi ricarica questo e tutto il componente


  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  function handleLogout(e)
  {
    e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    setUsername(null)
    setDropdownOpen(false);
    setUserId(null)
    navigate("/");
    console.log("sloggo")
  }



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

            <SearchBar></SearchBar>

            {/* <div className="search-container">
              <input type="search" placeholder="Cerca giochi..." />
            </div> */}

           
            
          
            

            <div className="user-menu-container">
                {username && (
                    <div 
                      className={`btn-login dropdown ${dropdownOpen ? 'show' : ''}`} 
                      onClick={toggleDropdown} 
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                        alt="User Icon"
                        className="icon-user"
                      />
                      {username}

                      <div className="dropdown-content">
                        <Link to="/favorites">Favorites</Link>
                        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</div>
                      </div>
                    </div>
                )}

                {!username && (
                  <Link to="/login">
                    <div className="btn-login">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                        alt="User Icon"
                        className="icon-user"
                      />
                      Login
                    </div>
                  </Link>
                )}
            </div>


            {/* {username ? 
            (
              <div className="btn-login" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="User Icon" className="icon-user" />
              {username}
              </div>
            ) 
            : 
            (<Link to="/login">
              <div className="btn-login">
              <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="User Icon" className="icon-user" />
              Accedi
              </div>
            </Link>)} */}



            {/* <Link to="/login">
              <div className="btn-login">
              <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="User Icon" className="icon-user" />
              Accedi
              </div>
            </Link> */}


        </nav>

          
    </>
    

  );
}

export default Navbar;
