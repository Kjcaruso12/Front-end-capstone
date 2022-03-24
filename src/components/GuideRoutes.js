import React from "react";
import { Route } from "react-router-dom";
import { CitySelect } from "./guides/CitySelect";
import { GuideForm } from "./guides/GuideForm";

export default () => {
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