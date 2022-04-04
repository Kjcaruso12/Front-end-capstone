import React from "react"
import { NavBarLoggedOut } from "./nav/NavBar"
import { Route } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Landing } from "./landing/Landing"

export default () => {
    return (
        <>
            <Route path="/login" >
                <NavBarLoggedOut />
                <Login />
            </Route>
            <Route path="/register">
                <NavBarLoggedOut />
                <Register />
            </Route>
            <Route exact path="/home">
                <NavBarLoggedOut />
                <Landing />
            </Route>
        </>
    )
}