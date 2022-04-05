import React from "react"
import AccountRoutes from "./AccountRoutes"
import GuideRoutes from "./GuideRoutes"
import { NavBarLoggedIn } from "./nav/NavBar"


export const ApplicationViews = () => {
    return (
        <>
            <NavBarLoggedIn />
            <AccountRoutes />
            <GuideRoutes />
        </>
    )
}