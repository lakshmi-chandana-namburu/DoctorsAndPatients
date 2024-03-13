import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';
function Navigation(){
    
    return(
        <div className="navbar">
            <a href="#" id="logo" className="nav">TRUE CARE+</a>
            <Link to="/" className="nav">Home</Link>
            <Link to="/doctor" className="nav">Doctor</Link>
            <Link to="/patient" className="nav">patient</Link>
        </div>
    )
}

export default Navigation;