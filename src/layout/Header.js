import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <Link className="route-link" to="/">Home</Link>
            <Link className="route-link" to="/email-list">Email List</Link>
        </div>
    );
}

export default Header;
