import React, { useState, useEffect } from "react"
import { GuideDialogSingleDelete, GuideDialogAllDelete } from "./GuideDialog"
import useModal from "../../hooks/useModal"
import { getAllUserGuides, getPhotos, getYourGuides } from "../ApiManager";
import { GuideCard } from "./GuideCard"
import Settings from "../../Settings";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai"
import "./GuideList.css"


export const GuideList = (props) => {
    const [YourGuides, setYourGuides] = useState([])
    const [SavedGuides, setSavedGuides] = useState([])
    const [allUserGuides, setAllUserGuides] = useState([])
    const [photos, setPhotos] = useState([])
    const [currentGuide, setCurrentGuide] = useState({})
    let { toggleDialog, modalIsOpen } = useModal("#dialog--guides")
    const history = useHistory()

    const currentUser = Settings.currentUser

    useEffect(
        () => {
            if (currentUser !== 0) {
            let savedGuides = []
            //fetch all userGuides for current user
            return getYourGuides(currentUser)
                .then((userGuides) => {
                    //iterate to get the array of saved guides where author property is true
                    const matchedGuides = userGuides?.filter(guide => guide.author === true)
                    savedGuides = userGuides?.filter(guide => guide.author === false)
                    setSavedGuides(savedGuides)
                    return matchedGuides
                })
                .then((matchedGuides) => {
                    setYourGuides(matchedGuides)
                })
        }
    }
        , [currentUser]
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
            getAllUserGuides()
                .then(setAllUserGuides)
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

    const confirmDeleteAllSaved = () => {
        toggleDialog()
    }


    return (

        <div className="guide_list">
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
                    {YourGuides?.map((userGuide, index) =>
                        <GuideCard key={`guide--${userGuide.id}`}
                            YourGuide={userGuide}
                            userGuides={allUserGuides}
                            photos={photos}
                            confirmGuideDelete={confirmGuideDelete}
                            index={index}
                            lastGuide={YourGuides.length - 1}
                        />)
                    }
                </div>
            </div>


            <GuideDialogSingleDelete toggleDialog={toggleDialog} userGuide={currentGuide} />
            <GuideDialogAllDelete toggleDialog={toggleDialog} />
            <div className="saved__container">
                <div className="your__header">
                    <div>
                        <h2 className="guide_header">Saved Guides</h2>
                    </div>
                    <button
                        className="create_button"
                        onClick={() => { confirmDeleteAllSaved() }}>Clear all</button>
                </div>
                <div className="your_guides">
                    {SavedGuides?.map((userGuide, index) =>
                        <GuideCard key={`guide--${userGuide.id}`}
                            YourGuide={userGuide}
                            userGuides={allUserGuides}
                            photos={photos}
                            confirmGuideDelete={confirmGuideDelete}
                            index={index}
                            lastGuide={YourGuides.length - 1}
                        />)
                    }
                </div>
            </div>
        </div>
    )
}