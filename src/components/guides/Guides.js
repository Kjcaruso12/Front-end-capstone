import React, { useState, useEffect } from "react"
import { GuideDialogSingleDelete, GuideDialogAllDelete } from "./GuideDialog"
import { useModalAll, useModalSingle } from "../../hooks/useModal";
import { getOtherUserGuides } from "../ApiManager";
import Settings from "../../Settings";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai"
import "./GuideList.css"
import { GuideView } from "./GuideView";


export const GuideList = (props) => {
    const [otherGuides, setOtherGuides] = useState([])
    const [photos, setPhotos] = useState([])
    const [currentGuide, setCurrentGuide] = useState({})
    let { toggleSingleDialog, singleModalIsOpen } = useModalSingle("#dialog--guide")
    let { toggleAllDialog, allModalIsOpen } = useModalAll("#dialog--guides")
    const history = useHistory()

    const currentUserId = Settings.currentUser

    useEffect(
        () => {
            //set all userGuides with guide expanded
            getOtherUserGuides()
                .then(setOtherGuides)

        }, []
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
            <div className="guide__container">
                <div class="pt-5 pb-4">
                    <div class="text-center">
                        <h1 class="font-weight-bold mb-3 line-height-1">
                            Explore various travel guides
                        </h1>
                    </div>
                    <div class="row mt-4">
                        <div className="col-xl-6 offset-xl-3 col-md-8 offset-md-2 col-12">
                            <div className="position-relative d-flex align-items-center inputContainer">
                                <div className="inputContainer__icon text-muted">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                                        </path>
                                    </svg>
                                </div>
                                <input type="text" className="smartlook-show form-control input__input w-100 input__inputWithIcon d0flex align-items-center form-control baseAutosuffest_print" placeholder="Search for a destination" value />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5 pb-4">
                    <div className="mb-2">
                        <h2 className="font-weight-bold mb-3 line-height-1">Recent Guides</h2>
                    </div>
                    <div className="row mt-n5">

                {otherGuides?.map((guide, index) =>
                    <GuideView key={`guide--${guide.id}`}
                    currentGuide={guide}
                    userGuides={allUserGuides}
                    photos={photos}
                    index={index}
                    lastGuide={YourGuides.length - 1}
                    />)
                }
                </div>



                    {/* </div>
                </div>
            <div className="your__header">
                <div>
                    <h2 className="guide_header">Your Guides</h2>
                </div>
                <button
                    className="create_button"
                    onClick={() => { history.push("/guides/create") }}>{AiOutlinePlus()} Create new guide</button>
            </div>
            <div className="your_guides">
            </div>
        </div>
            </div >
        </div >
    )
} */}