import React from "react";
import { GuideList } from "../guides/GuideList";
import { NavBarLoggedIn } from "../nav/NavBar";


export default () => {

    return (
        <>
            <NavBarLoggedIn  />
            <GuideList />
        </>
    )
}