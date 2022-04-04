import React from "react"
import { Route } from "react-router-dom"
import { Account } from "./account/Account"
import DashBoard from "./dashboard/DashBoard"


export default () => {

    return (
        <>
            <Route path="/">
                <DashBoard />
            </Route>
            <Route path="/account">
                <Account />
            </Route>
        </>
    )
}