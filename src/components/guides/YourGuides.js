import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GuideDialogSingleDelete } from "./GuideDialog"
import useModal from "../../hooks/useModal"
import { AiOutlinePlus } from "react-icons/ai";
import { getPhotos, getYourGuides } from "../ApiManager";
import { GuideCard } from "./GuideCard"
import Settings from "../../Settings";
import "./YourGuides.css"


export const YourGuides = (props) => {
    const [YourGuides, setYourGuides] = useState([])
    const [photos, setPhotos] = useState([])
    const [currentGuide, setCurrentGuide] = useState({})
    let { toggleDialog, modalIsOpen } = useModal("#dialog--guide")
    const history = useHistory()

    useEffect(
        () => {
            //fetch all userGuides for currernt user
            return getYourGuides(Settings.currentUser)
                .then((userGuides) => {
                    //iterate to get the array of saved guides where author property is true
                    const matchedGuides = userGuides?.filter(guide => guide.author === true)
                    return matchedGuides
                    })
                .then((matchedGuides) => {
                    setYourGuides(matchedGuides)
                })
        }
        , []
    )

    useEffect(
        () => {
            getPhotos()
                .then(setPhotos)
        }
        , []
    )

    useEffect(() => {
        const handler = e => {
            // event keyCode = escape button and modalIsOpen
            if (e.keyCode === 27 && modalIsOpen) {
                // run toggleDialog()
                toggleDialog()
            }
        }
        // adds eventListener
        window.addEventListener("keyup", handler)
        // removes eventListener?
        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog, modalIsOpen])

    const confirmGuideDelete = guide => {
        setCurrentGuide(guide)
        toggleDialog()
    }


    return (
        <>
            <GuideDialogSingleDelete toggleDialog={toggleDialog} userGuide={currentGuide} />
            <div className="your__container">
                <div className="your__header">
                    <div>
                        <h2 className="guide_header">Your Guides</h2>
                    </div>
                    <button
                        className="create_button"
                        onClick={() => { history.push("/guides/create") }}>{AiOutlinePlus()} Create new guide</button>
                </div>
                <div className="your_guides">
                    <ul className="guide_rows">
                        {YourGuides?.map((userGuide, index) =>
                            <GuideCard key={`guide--${userGuide.id}`}
                                YourGuide={userGuide}
                                photos={photos}
                                confirmGuideDelete={confirmGuideDelete}
                                index={index}
                                lastGuide={YourGuides.length - 1}
                            />)
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}