import React from "react";
import { Route } from "react-router-dom";
import { CitySelect } from "./guides/CitySelect";
import { GuideForm } from "./guides/GuideForm";
import { Guide } from "./guides/Guide";

export default () => {
    return (
        <>
            <Route exact path="/guides/create">
                <CitySelect />
            </Route>
            <Route exact path="/guides/create/:cityId(\d+)">
                <GuideForm />
            </Route>
            {/* <Route exact path="/guides/:guideId(\d+)">
                <Guide />
            </Route> */}
            {/* <Route exact path="/guides">
                <Guides />
            </Route> */}
        </>
    )
}