import React, { useState, useEffect } from "react"
import { GuideDialogSingleDelete, GuideDialogAllDelete } from "./GuideDialog"
import { useModalAll, useModalSingle } from "../../hooks/useModal";
import { getAllUserGuides, getCurrentUser, getPhotos, getYourGuides } from "../ApiManager";
import { GuideCard } from "./GuideCard"
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai"
import "./GuideList.css"


export const GuideList = () => {
    const [user, setUser] = useState({})
    const [YourGuides, setYourGuides] = useState([])
    const [SavedGuides, setSavedGuides] = useState([])
    const [allUserGuides, setAllUserGuides] = useState([])
    const [photos, setPhotos] = useState([])
    const [currentGuide, setCurrentGuide] = useState({})
    let { toggleSingleDialog, singleModalIsOpen } = useModalSingle("#dialog--guide")
    let { toggleAllDialog, allModalIsOpen } = useModalAll("#dialog--guides")
    const history = useHistory()

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
            return getYourGuides(user?.id)
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
            getAllUserGuides()
                .then(setAllUserGuides)
        }
        , []
    )

    useEffect(() => {
        const handler = e => {
            // event keyCode = escape button and modalIsOpen
            if (e.keyCode === 27 && singleModalIsOpen) {
                // run toggleDialog()
                toggleSingleDialog()
            }
        }
        // adds eventListener
        window.addEventListener("keyup", handler)
        // removes eventListener?
        return () => window.removeEventListener("keyup", handler)
    }, [toggleSingleDialog, singleModalIsOpen])

    useEffect(() => {
        const handler = e => {
            // event keyCode = escape button and modalIsOpen
            if (e.keyCode === 27 && allModalIsOpen) {
                // run toggleDialog()
                toggleAllDialog()
            }
        }
        // adds eventListener
        window.addEventListener("keyup", handler)
        // removes eventListener?
        return () => window.removeEventListener("keyup", handler)
    }, [toggleAllDialog, allModalIsOpen])

    const confirmGuideDelete = guide => {
        setCurrentGuide(guide)
        toggleSingleDialog()
    }

    const confirmDeleteAllSaved = () => {
        toggleAllDialog()
    }

    return (

        <div className="guide_list">
            <GuideDialogAllDelete toggleAllDialog={toggleAllDialog} />
            <GuideDialogSingleDelete toggleSingleDialog={toggleSingleDialog} userGuide={currentGuide} />
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
                            photo={photos}
                            confirmGuideDelete={confirmGuideDelete}
                            index={index}
                            lastGuide={YourGuides.length - 1}
                        />)
                    }
                </div>
            </div>
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
                            photo={photos}
                            confirmGuideDelete={confirmGuideDelete}
                            index={index}
                            lastGuide={SavedGuides.length - 1}
                        />)
                    }
                </div>
            </div>
        </div>
    )
}