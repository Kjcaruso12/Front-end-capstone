import React from "react"
import { Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { Landing } from "./landing/Landing"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/home">
                <NavBar />
                <Landing />
            </Route>
        </>
    )
}