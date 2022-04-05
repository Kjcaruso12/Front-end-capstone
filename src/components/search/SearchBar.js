import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllGuides } from "../ApiManager";
import "./SearchBar.css"


export const SearchBar = (props) => {
    const [guides, setGuides] = useState([])
    const [location, setLocation] = useState({})
    const [suggestions, setSuggestions] = useState([])
    const ulRef = useRef()
    const inputRef = useRef()
    const history = useHistory()
    let filterTimeout;


    useEffect(
        () => {
            inputRef.current.addEventListener('click', (event) => {
                ulRef.current.style.display = 'flex'
            })
            ulRef.current.addEventListener('click', (event) => {
                ulRef.current.style.display = 'none'
            })
        }, []
    )

    useEffect(
        () => {
            getAllGuides()
                .then(setGuides)
        }
        , []
    )

    const doCitySearch = query => {
        clearTimeout(filterTimeout)
        if (!query) return setSuggestions([])

        filterTimeout = setTimeout(() => {
            console.log('====>', query)
            const access_key = "d40d6975f689549be1b6918c81574d47"
            const secret_key = "dd2a53212a1a6ac42b9b07b6fbccff26"
            var auth_key = btoa(`${access_key}:${secret_key}`)
            fetch(`https:/api.roadgoat.com/api/v2/destinations/auto_complete?q=${query}`, {
                'method': 'GET',
                'headers': {
                    'Authorization': `Basic ${auth_key}`
                }
            })
                .then(res => res.json())
                .then((location) => {
                    console.log(location)
                    const locationData = location.data.map(destination => {
                        return destination
                    })
                    return locationData
                })
                .then((locationData) => {
                    setSuggestions(locationData)
                })
        }, 500)
    }


    return (
        <>
            <div className="city_dropdown">
                <input type="text"
                    className="form-control"
                    onKeyPress={e => (doCitySearch(e.target.value))}
                    placeholder="Which location would you like to look select?"
                    ref={inputRef} />
                <ul className="city_list" ref={ulRef}>
                    {suggestions ?
                        suggestions.map((suggestion, index) => {
                            return <button
                                id={suggestion.id}
                                key={index}
                                type="button"
                                value={suggestion.attributes.name}
                                className="citylist_item"
                                onClick={(e) => {
                                    inputRef.current.value = suggestion.attributes.name
                                    setLocation(suggestion)
                                }}>
                                {suggestion.attributes.name}
                            </button>
                        })
                        : ""
                    }
                </ul>
                <button
                    className="city_submit"
                    onClick={() => {
                        history.push(`/guides/create/${location.id}`)
                    }
                    }>
                    Start Guide
                </button>
            </div>
        </>
    )
}
