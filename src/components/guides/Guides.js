import React, { useState, useEffect } from "react"
import { getAllGuides, getCurrentUser, getPhotos, getYourGuides } from "../ApiManager";

import "./GuideList.css"
import { GuideView } from "./GuideView"


export const Guides = () => {
    const [user, setUser] = useState({})
    const [YourGuides, setYourGuides] = useState([])
    const [allGuides, setAllGuides] = useState([])
    const [photos, setPhotos] = useState([])

    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
        }
        , []
    )

    useEffect(
        () => {
            let savedGuides = []
            //fetch all userGuides for current user
            return getYourGuides(user.id)
                .then((userGuides) => {
                    //iterate to get the array of saved guides where author property is true
                    const matchedGuides = userGuides?.filter(guide => guide.author === true)
                    savedGuides = userGuides?.filter(guide => guide.author === false)
                    return matchedGuides
                })
                .then((matchedGuides) => {
                    setYourGuides(matchedGuides)
                })
        }
        , [user]
    )

    useEffect(
        () => {
            getPhotos()
                .then(setPhotos)
        }
        , []
    )

    useEffect(
        () => {
            getAllGuides()
                .then(setAllGuides)
        }
        , []
    )





    return (
        <ul className="guides">
            {allGuides?.map((userGuide, index) =>
                <GuideView key={`guide--${userGuide.id}`}
                    YourGuide={userGuide}
                    userGuides={allGuides}
                    photos={photos}
                    index={index}
                    lastGuide={allGuides.length - 1}
                />)
            }
        </ul>
    )
}