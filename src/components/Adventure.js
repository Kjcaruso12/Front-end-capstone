import React from "react";
import { Redirect, Route } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar, SideNavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { HomeViews } from "./HomeViews";
import { Landing } from "./landing/Landing";

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
                    return <Redirect to="/home" />;
                }
            }}
        />

        <Route path="/login">
            <NavBar />
            <Login />
        </Route>
        <Route path="/register">
            <NavBar />
            <Register />
        </Route>
        <Route exact path="/home">
                <NavBar />
                <Landing />
        </Route>
    </>
);