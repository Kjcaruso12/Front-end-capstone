import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import  RoadGoat  from "../../RoadGoat"

export const CitySelect = (props) => {
    const [cities, setCities] = useState([])
    const [text, setText] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory()
    // useEffect(
    //     () => {
    //         // setCities(<RoadGoat />)
    //     }
    // )

    useEffect(
        () => {
            RoadGoat()
        }, [cities]
    )

    const onChangeHandler = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = cities.filter(city => {
                return city.data.attribute.long_name.includes(text)
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setText(text)
    }



    return (
        <>
            <h1>Travel Guide</h1>
            <div className="city__search">
                <input type="text"
                onChange={e => onChangeHandler(e.target.value)}
                value={text} />
            </div>
            <button
            onClick={() => { history.push(`/guides/create/${text + " guide"}`)}

            }>Start Guide</button>
        </>
    )
}