import React from "react"
import { Route } from "react-router-dom"
import { Account } from "./account/Account"
import DashBoard from "./dashboard/DashBoard"
import { NavBarLoggedIn } from "./nav/NavBar"



export const ApplicationViews = () => {
    return (
        <>
            <NavBarLoggedIn />
            <Route path="/dashboard">
                <DashBoard />
            </Route>
            <Route path="/account">
                <Account />
            </Route>
        </>
    )
}