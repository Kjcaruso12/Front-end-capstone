import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"



export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/guides">Browse Guides</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Explore</Link>
            </li>
        </ul>
    )
}

export const SideNavBar = (props) => {
    return (
        <ul className="sidenavbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/guides">Browse Guides</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Explore</Link>
            </li>
        </ul>
    )
}