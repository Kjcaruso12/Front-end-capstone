import React, { useEffect, useState } from "react"
import { CitySelect } from "./CitySelect"
import { useParams } from "react-router-dom"


export const GuideForm = () => {
    const [guideName, setGuideName] = useState("")

    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [tips, setTips] = useState("")
    const [places, setPlaces] = useState([])
    const { cityId } = useParams()


    const NewList = () => {
        return (
            <div className="form-group">
            <label htmlFor="places">Places To Visit</label>
            <input
                type="text"
                className="form-control"
                onKeyPress={(e) => {
                    if (e.key === 13) {
                        setPlaces()
                        NewList()
                    }
                    else {
                        setPlaces(e.target.value)
                    }
                }}
                id="places"
                placeholder='Add a Title(e.g., "Restaurants", "Museums")'
            />
        </div>
        )
    }


    return (
        <form className="guideForm">
            <div className="form-group">
                <label htmlFor="description"></label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setDescription(e.target.value)}
                    id="description"
                    placeholder="Tell readers how you know city(e.g., I've lived there, visited a couple times, or first time being there) as well as your travel experience in general(e.g., across 5 continents)"
                />
            </div>
            <div className="form-group">
                <label htmlFor="tips">General Tips</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={e => setTips(e.target.value)}
                    id="tips"
                    placeholder="Provide general tips, such as how to get around, or best times of the year to visit"
                />
            </div>
            <div className="form-group">
                <label htmlFor="places">Places To Visit</label>
                <input
                    type="text"
                    className="form-control"
                    value="Places to visit"
                    onKeyPress={(e) => {
                        if (e.key === 13) {
                            setPlaces()
                            NewList()
                        }
                        else {
                            setPlaces(e.target.value)
                        }
                    }}
                    id="places"
                    placeholder='Add a Title(e.g., "Restaurants", "Museums")'
                />
            </div>
            <div className="form-group">
                <label htmlFor="places"></label>
                <input
                    type="text"
                    className="form-control"
                    onKeyPress={(e) => {
                        if (e.key === 13) {
                            setPlaces()
                            NewList()
                        }
                        else {
                            setPlaces(e.target.value)
                        }
                    }}
                    id="places"
                    placeholder='Add a Place'
                />
            </div>
        </form>
    )
}
