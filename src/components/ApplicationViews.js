import React from "react"
import { Route } from "react-router-dom"
import DashBoard from "./dashboard/DashBoard"



export const ApplicationViews = () => {
    return (
        <>  
            <Route path="/dashboard">
                <DashBoard />
            </Route>
        </>
    )
}