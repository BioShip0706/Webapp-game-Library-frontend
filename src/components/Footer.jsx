import React from 'react';
import './Footer.css'; 

function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Game Library - By BioShip</p> {/*&copy per  il logo copyright */}
                <nav className="footer-nav">

                </nav>
                <div className="social-links">
                    <a href="https://www.youtube.com/@BioShip0706" target="_blank" >Youtube</a>
                    <a href="https://www.linkedin.com/in/riccardo-sarritzu-0188ba276/" target="_blank" >Linkedin</a>
                    <a href="https://github.com/BioShip0706" target="_blank" >Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;