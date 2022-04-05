import React from "react"
import { SearchBar } from "../search/SearchBar"
import "./CitySelect.css"

export const CitySelect = () => {

    return (
        <div className="select_city">
            <h1 className="searchpage">Travel Guide</h1>
            <SearchBar />
        </div>
    )
}