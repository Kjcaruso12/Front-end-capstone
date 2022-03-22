import React from "react";
import { Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { SideNavBar } from "./nav/NavBar";
import HomeRoutes from "./HomeRoutes";

export const Adventures = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("user_explorer")) {
                    return (
                        <>
                            <SideNavBar />
                            <ApplicationViews />
                        </>
                    );
                } else {
                    <HomeRoutes />
                }
            }}
        />
    </>
);