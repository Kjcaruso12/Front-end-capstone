import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css"


export const SearchBar = () => {
    const [text, setText] = useState("")
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
                    const locationData = location.data.map(destination => {
                        return destination.attributes.name
                    })
                    return locationData
                })
                .then((locationData) => {
                    setSuggestions(locationData)
                    setText(query)
                })
        }, 500)
    }


    return (
        <>
            <div className="city_dropdown">
                <input type="text"
                    className="form-control"
                    onKeyPress={e => (doCitySearch(e.target.value))}
                    placeholder="Which location?"
                    ref={inputRef} />
                <ul className="city_list" ref={ulRef}>
                    {
                        suggestions.map((suggestion, index) => {
                            return <button
                                key={index}
                                type="button"
                                value={suggestion}
                                className="citylist_item"
                                onClick={(e) => {
                                    inputRef.current.value = suggestion
                                }}>
                                {suggestion}
                            </button>
                        })

                    }
                </ul>
            </div>
            <button
                onClick={() => {
                    history.push(`/guides/create/${text + " guide"}`)
                }
                }>
                Start Guide
            </button>
        </>
    )
}
