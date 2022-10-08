import React, { useEffect, useState } from "react";
import './Nav.css'

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 250) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, []);


    return (
        <nav className={`nav ${show && 'nav--black'}`}>
            <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix logo"/>

            <img
            className="nav__userlogo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix User"/>
        </nav>
    )
}


export default Nav