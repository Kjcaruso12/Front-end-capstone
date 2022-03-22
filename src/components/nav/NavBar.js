import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"



export const NavBarLoggedOut = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__logo">
                <img className="logo" src={require("./AdventureBound.png")} alt="Company Logo" width="200" height="200" />
            </li>
            <li className="navbar__register">
                <Link className="navbar__link" to="/register">Sign Up</Link>
            </li>
            <li className="navbar__login ">
                <Link className="navbar__link" to="/login">Sign In</Link>
            </li>
        </ul>
    )
}

export const NavBarLoggedIn = (props) => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__logo">
                <img className="logo" src={require("./AdventureBound.png")} alt="Company Logo" width="200" height="200" />
            </li>
            <li className="navbar__register">
                <div>
                    <input
                        type="text"
                        className="form-control"
                        onKeyPress={(e) => {
                            if (e.key === 13) {
                                history.push("guides")
                            }
                        }}
                        id="places"
                        placeholder='Add a Place'
                    />
                </div>
            </li>
            <li className="navbar__login ">
                <Link className="navbar__link" to="/login">Sign In</Link>
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