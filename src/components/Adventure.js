import React from "react";
import { Redirect, Route } from "react-router-dom";
import  ApplicationViews  from "./ApplicationViews";
import HomeRoutes from "./HomeRoutes";

export const Adventures = () => {
    return <>
        <Route render={() => {
                if (localStorage.getItem("user_explorer") !== null) {
                    return <ApplicationViews />
                } else {
                    return <Redirect to="/home" />
                }
            }}
        />
        <HomeRoutes />
    </>
}
