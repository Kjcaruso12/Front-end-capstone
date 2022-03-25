import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getAllGuides, postGuide, postGuideLocations, postUserGuide } from "../ApiManager"
import "./GuideForm.css"


export const GuideForm = () => {
    const [guides, setGuides] = useState([])
    const [guideTitle, setGuideTitle] = useState("")
    const [photo, setPhoto] = useState("")
    const [description, setDescription] = useState("")
    const [tips, setTips] = useState("")
    const history = useHistory()
    const [places, setPlaces] = useState({
        title: "",
        description: "",
    })
    const { cityId } = useParams()

    const handlePlacesInput = (event) => {
        // adds the inputs to the state
        const copy = { ...places }
        // credentials/copy should have properties firstName, lastName, email, and employee
        copy[event.target.id] = event.target.value
        setPlaces(copy)
    }


    const handleUserGuide = () => {
        const newUserGuide = {
            userId: localStorage.getItem("user_explorer"),
            guideId: guides[-1].id,
            author: true

        }
        return newUserGuide
    }

    useEffect(
        () => {
            let guideName = ""
            const access_key = "d40d6975f689549be1b6918c81574d47"
            const secret_key = "dd2a53212a1a6ac42b9b07b6fbccff26"
            var auth_key = btoa(`${access_key}:${secret_key}`)
            fetch(`https:/api.roadgoat.com/api/v2/destinations/${cityId}`, {
                'method': 'GET',
                'headers': {
                    'Authorization': `Basic ${auth_key}`
                }
            })
                .then(res => res.json())
                .then((location) => {
                    const foundPhoto = location.included.map(place => {
                        if (place?.attributes?.image?.large) {
                            return place
                        }
                    })
                    guideName = (location?.data?.attributes?.name + ' Guide')
                    setGuideTitle(guideName)
                    setPhoto(foundPhoto[1])
                })
        }, []
    )

    useEffect(
        () => {
            getAllGuides()
                .then(setGuides)
        }, []
    )


    const handleNewGuide = () => {


        const timestamp = new Date()

        const newGuide = {
            cityId: cityId,
            photoId: photo.id,
            title: guideTitle,
            description: description,
            tips: tips,
            dataUploaded: timestamp.toLocaleString("en-US"),
            dateEdited: timestamp.toLocaleString("en-US")
        }

        const newLocation = {
            title: places.title,
            description: places.description,
            guideId: guides[-1]?.id
        }

        postGuide(newGuide)
        .then(postGuideLocations(newLocation))
        .then(setPhoto({}))
        .then(() => {
                if (guides) {
                    handleUserGuide()
                    (history.push("/dashboard"))
                }
            })
    }





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
                                    <div className="hoverTextInput__editableContainer hoverTextInput__lgContainer">
                                        <input type="text" placeholder="Enter trip title" className="smartlook-show hoverTextInput__input hoverTextInput__lgInput planHeaderRedisgn__title" defaultValue={guideTitle} />
                                        <div className="hoverTextInput__dummyInput hoverTextInput__lgDummy rounded position-absolute d-flex flex-row align-items-center">
                                            <span className="planHeaderRedsign__title invisible">{guideTitle}</span>
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
                                                            {/* <span className="bubble bubble__size__md bubble__colorTheme__gray300 user-select-none d-flex align-items-center justify-content-center editorBubble__bubble editorBubble__active">
                                                                    <div>K</div>
                                                                </span> */}
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
                            {guideTitle}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="guide_container">
            <form className="guideForm">
                <div className="big_input">
                    <input
                        type="text"
                        required
                        className="description"
                        onChange={e => setDescription(e.target.value)}
                        id="description"
                        placeholder="Tell readers how you know location(e.g., I've lived there, visited a couple times, or first time being there)."
                    />
                </div>
                <div className="big_input">
                    <h2 className="guide_tiptitle">General Tips</h2>
                    <input
                        type="text"
                        required
                        className="tips"
                        onChange={e => setTips(e.target.value)}
                        id="tips"
                        placeholder="Provide general tips, such as how to get around, or best times of the year to visit."
                    />
                </div>
                <div className="place_container">
                    <div className="places_form">
                        <input
                            type="text"
                            required
                            className="places"
                            defaultValue="Places to visit"
                            id="type"
                            placeholder='Add a Title(e.g., "Restaurants", "Museums")'
                        />
                    </div>
                    <div className="new_place">
                        <div className="places_input">
                            <input
                                type="text"
                                className="placetitle"
                                onChange={handlePlacesInput}
                                id="title"
                                placeholder='Add a place'
                            />
                            <input
                                type="text"
                                className="placedescription"
                                onChange={handlePlacesInput}
                                id="description"
                                placeholder='Add notes,links, etc.'
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="save"
                    type="submit"
                    onClick={handleNewGuide}
                >
                    Save Changes
                </button>
            </form>
        </div>
    </>
)
}
