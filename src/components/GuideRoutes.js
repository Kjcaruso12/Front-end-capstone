import React from "react";
import { Route } from "react-router-dom";
import { CitySelect } from "./guides/CitySelect";
import { GuideForm } from "./guides/GuideForm";

export default DashBoard = () => {
    return (
        <>
            <Route exact path="/guides/create">
                <CitySelect />
            </Route>
            <Route exact path="/guides/create/:guideId(\d+)">
                <GuideForm />
            </Route>
        </>
    )
}