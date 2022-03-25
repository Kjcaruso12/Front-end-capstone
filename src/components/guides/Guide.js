import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getcurrentGuide, getLocations, getPhotos } from "../ApiManager"
import "./GuideForm.css"


export const Guide = () => {
    const [photo, setPhoto] = useState("")
    const [guide, setGuide] = useState({})
    const [places, setPlaces] = useState({})
    const history = useHistory()

    const { guideId } = useParams()

    useEffect(
        () => {
            getPhotos()
                .then((photos) => {
                    const userPhoto = photos?.find(photo => photo.id === guide?.photoId)
                    return userPhoto
                })
                .then((userPhoto) => {
                    setPhoto(userPhoto)
                })
        }, []
    )

    useEffect(
        () => {
            getcurrentGuide(guideId)
                .then(setGuide)
        }, []
    )

    useEffect(
        () => {
            getLocations(guideId)
                .then(setPlaces)
        }, []
    )

    return (
        <>
            <div className="editorContainer">
                <div className="planpage_container_maxWidth">
                    <div className="planpage_container position-relative planPageContainer_noMargin">
                        <div className="planpage_container position-relative d-print-none planPageHeader__guide">
                            <div className="planPageHeader__imgContainer w-100 position-absolute">
                                <img className="planPageHeader__image w-100 object-fit-cover" src={photo.attributes?.image?.large} alt="travel image" />
                                <div className="planPageHeader_scrim position-absolute w-100"></div>
                            </div>
                            <div className="planPageHeader__header d-flex flex-column justify-content-between">
                                <div className="text-font">
                                    <div className="mt-2">
                                        <div className="hoverTextdiv__editableContainer hoverTextdiv__lgContainer">
                                            <div className="smartlook-show hoverTextdiv__div hoverTextdiv__lgdiv planHeaderRedisgn__title">{guide.title}</div>
                                            <div className="hoverTextdiv__dummydiv hoverTextdiv__lgDummy rounded position-absolute d-flex flex-row align-items-center">
                                                <span className="planHeaderRedsign__title invisible">{guide.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="m1-auto">
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="mx-1">
                                                    <div className="d-flex flex-nowrap">
                                                        <button className="editorBubble__container btn p-0 editorCursors__bubble"
                                                            type="button">
                                                            <div className="position-relative">
                                                                <span className="bubble bubble__size__md bubble__colorTheme__gray300 user-select-none d-flex align-items-center justify-content-center editorBubble__bubble editorBubble__active">
                                                                    <div>K</div>
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-print-block text-center mt-4">
                            <h1 className="font-weight-bold mb-3 line-height-1">
                                {guide.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="guide_container">
                <div className="guideForm">
                    <div className="big_div">
                        <div className="description">
                            ${guide.description}
                        </div>
                    </div>
                    <div className="big_div">
                        <h2 className="guide_tiptitle">General Tips</h2>
                        <div className="tips" />
                        {guide.tips}
                    </div>
                    <div className="place_container">
                        <div className="places_form">
                            <div className="placesInfo">
                                {/* {
                                        places?.map((place, index) => {
                                            <div className="placeinfo" key={index}>
                                                <div className="titleview">{place.title}</div>
                                                <div className="descriptionview">{place.description}</div>
                                            </div>
                                        })

                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}