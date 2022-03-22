import { YourGuides } from "../guides/YourGuides";
import React from "react";
import { Route } from "react-router-dom";
import { SavedGuides } from "../guides/SavedGuides";

export default () => {
    return (
        <>
            <div className="guide_container">
            <YourGuides />
            <SavedGuides />
            </div>
        </>
    )
}