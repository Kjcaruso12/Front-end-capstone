import React from "react"
import { Route } from "react-router-dom"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/landing">
                <Landing />
            </Route>
            <Route exact path="/home">
                <Home />
            </Route>
        </>
    )
}