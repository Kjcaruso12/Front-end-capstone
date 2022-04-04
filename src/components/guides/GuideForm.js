import React, { useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getAllGuides, getLocations, getPhotos, getYourGuides, postGuide, postGuideLocations, postUserGuide, putGuide, putLocations } from "../ApiManager"
import "./GuideForm.css"
import Settings from "../../Settings"


export const GuideForm = () => {
    const [guides, setGuides] = useState([])
    const [currentGuide, setCurrentGuide] = useState()
    const [guideTitle, setGuideTitle] = useState("")
    const [photo, setPhoto] = useState("")
    const [photos, setPhotos] = useState([])
    const [description, setDescription] = useState("")
    const [tips, setTips] = useState("")
    const history = useHistory()
    const [places, setPlaces] = useState([])
    const [newPlace, setPlace] = useState(
        [
            {
                type: "",
                title: "",
                description: ""
            },
            {
                type: "",
                title: "",
                description: ""
            },
            {
                type: "",
                title: "",
                description: ""
            }
        ]
    )
    const { cityId } = useParams()
    const ref = useRef(currentGuide?.guide?.dateUploaded)

    const handleNewUserInput = (event, index, prop) => {
        const copy = [...places]
        console.log(copy)
        let anotherCopy = { ...copy[index] }
        anotherCopy[prop] = event.target.value
        copy[index] = anotherCopy
        return copy
    }

    const handleBlankInput = (event, index, prop) => {
        const copy = [...newPlace]
        console.log(copy)
        let anotherCopy = { ...copy[index] }
        anotherCopy[prop] = event.target.value
        copy[index] = anotherCopy
        return copy
    }

    const handleSplit = (e) => {
        const split = e.target.id.split("_")
        const prop = split[0]
        const index = parseInt(split[1])
        const input = handleNewUserInput(e, index, prop)
        setPlaces(input)
    }

    const handleSplitNew = (e) => {
        const split = e.target.id.split("_")
        const prop = split[0]
        const index = parseInt(split[1]) - 1
        const input = handleBlankInput(e, index, prop)
        setPlace(input)
    }

    const handleUserGuide = (lastguide) => {
        const newUserGuide = {
            userId: parseInt(localStorage.getItem("user_explorer")),
            guideId: lastguide + 1,
            author: true

        }
        postUserGuide(newUserGuide)
    }


    useEffect(
        () => {
            if (parseInt(cityId) < 10 && currentGuide !== null) {
                const matchPhoto = photos?.find(pho => pho.id === currentGuide?.guide.photoId)
                setGuideTitle(currentGuide?.guide?.title)
                setPhoto(matchPhoto)
            }
            else {
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
                        const foundPhotos = location.included.filter(place => {
                            return place?.attributes?.image?.large
                        })
                        guideName = (location?.data?.attributes?.name + ' Guide')
                        setGuideTitle(guideName)
                        setPhoto(foundPhotos[2])
                    })
            }
            setDescription(currentGuide?.guide?.description)
            setTips(currentGuide?.guide?.tips)
        }, [currentGuide]
    )

    useEffect(
        () => {
            getAllGuides()
                .then(setGuides)
        }, []
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
            getYourGuides(Settings.currentUser)
                .then((yourGuides) => {
                    const matchGuide = yourGuides?.find(item => item.guide.cityId === parseInt(cityId) && item.author === true)
                    setCurrentGuide(matchGuide)
                })
        }
        , []
    )

    useEffect(
        () => {
            getLocations(currentGuide?.guideId)
                .then((placeArr) => {
                    const matchedPlaces = placeArr?.filter(singlePlace => singlePlace.guideId === currentGuide?.guide?.id)
                    setPlaces(matchedPlaces)
                })
        }
        , [currentGuide]
    )


    const handleNewGuide = (e) => {
        e.preventDefault()
        const timestamp = new Date()
        const lastGuide = (guides.length) - 1
        if (currentGuide !== undefined) {

            const editedGuide = {
                cityId: parseInt(cityId),
                photoId: parseInt(currentGuide?.guide?.photoId),
                title: guideTitle,
                description: description,
                tips: tips,
                dateUploaded: ref,
                dateEdited: timestamp.toLocaleString("en-US"),
                id: currentGuide?.guide?.id
            }
            places?.map(loc => {
                const newLocation = {
                    id: loc.id,
                    type: loc.type,
                    title: loc.title,
                    description: loc.description,
                    guideId: currentGuide?.guide.id
                }
                putLocations(newLocation)
            })
            putGuide(editedGuide)
        }
        else {
            if (newPlace.length > 0) {
                handleUserGuide(lastGuide)
            }
                newPlace?.map(loc => {
                    const newLocation = {
                        guideId: lastGuide + 1,
                        type: loc.type,
                        title: loc.title,
                        description: loc.description
                    }
                    postGuideLocations(newLocation)
                })
            const newGuide = {
                cityId: parseInt(cityId),
                photoId: parseInt(photo.id),
                title: guideTitle,
                description: description,
                tips: tips,
                dateUploaded: timestamp.toLocaleString("en-US"),
                dateEdited: timestamp.toLocaleString("en-US"),
            }
            postGuide(newGuide)
        }
        history.push("/")
    }

    return (
        places && photo ?
            <>
                <div className="editorContainer">
                    <div className="planpage_container_maxWidth">
                        <div className="planpage_container position-relative planPageContainer_noMargin">
                            <div className="planpage_container position-relative d-print-none planPageHeader__guide">
                                <div className="planPageHeader__imgContainer w-100 position-absolute">
                                    <img className="planPageHeader__image w-100 object-fit-cover" src={photo?.imgPath ? photo?.imgPath : photo?.attributes?.image?.large} alt="travel image" />
                                    <div className="planPageHeader_scrim position-absolute w-100"></div>
                                </div>
                                <div className="planPageHeader__header d-flex flex-column justify-content-between">
                                    <div className="text-font">
                                        <div className="mt-2">
                                            <div className="hoverTextInput__editableContainer hoverTextInput__lgContainer">
                                                <input type="text" placeholder="Enter trip title" className="smartlook-show hoverTextInput__input hoverTextInput__lgInput planHeaderRedisgn__title" value={guideTitle} onChange={e => setGuideTitle(e.target.value)} />
                                                <div className="hoverTextInput__dummyInput hoverTextInput__lgDummy rounded position-absolute d-flex flex-row align-items-center">
                                                    <span className="planHeaderRedsign__title invisible" onChange={e => setGuideTitle(e.target.value)}>{guideTitle}</span>
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
                            <h2 className="guide_tiptitle">Brief description</h2>
                            <textarea
                                type="text"
                                value={description}
                                required
                                className="description"
                                onChange={e => setDescription(e.target.value)}
                                id="description"
                                placeholder="Tell readers how you know location(e.g., I've lived there, visited a couple times, or first time being there)."
                            />
                        </div>
                        <div className="big_input">
                            <h2 className="guide_tiptitle">General Tips</h2>
                            <textarea
                                type="text"
                                className="tips"
                                onChange={e => setTips(e.target.value)}
                                value={tips}
                                required
                                id="tips"
                                placeholder="Provide general tips, such as how to get around, or best times of the year to visit."
                            />
                        </div>
                        <div>
                            <hr className="tip_divider" />
                        </div>
                        {places.length > 0 ?
                            places?.map((loc, index) => {
                                return <div className="place_container" key={index}>
                                    <div className="places_form" >
                                        <input
                                            type="text"
                                            className="type"
                                            onChange={handleSplit}
                                            value={places[index].type}
                                            id={`type_${index}`}
                                            placeholder='Add a Title(e.g., "Restaurants", "Museums")'
                                        />
                                    </div>
                                    <div className="new_place" key={index + 1}>
                                        <div className="places_input">
                                            <input
                                                type="text"
                                                className="placestitle"
                                                onChange={handleSplit}
                                                value={places[index].title}
                                                id={`title_${index}`}
                                                placeholder="Add a place"
                                            />
                                            <textarea
                                                type="text"
                                                className="placesdescription"
                                                onChange={handleSplit}
                                                value={places[index].description}
                                                id={`description_${index}`}
                                                placeholder="Add notes,links, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                            }) :
                            <>
                                <div className="place_container">
                                    <div className="places_form">
                                        <input
                                            type="text"
                                            className="type"
                                            onChange={handleSplitNew}
                                            id="type_1"
                                            placeholder='Add a Title(e.g., "Restaurants", "Museums")'
                                        />
                                    </div>
                                    <div className="new_place">
                                        <div className="places_input">
                                            <input
                                                type="text"
                                                className="placestitle"
                                                onChange={handleSplitNew}
                                                id="title_1"
                                                placeholder="Add a place"
                                            />
                                            <textarea
                                                type="text"
                                                className="placesdescription"
                                                onChange={handleSplitNew}
                                                id="description_1"
                                                placeholder="Add notes,links, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="place_container">
                                    <div className="places_form">
                                        <input
                                            type="text"
                                            className="type"
                                            onChange={handleSplitNew}
                                            id="type_2"
                                            placeholder='Add a Title(e.g., "Restaurants", "Museums")'
                                        />
                                    </div>
                                    <div className="new_place">
                                        <div className="places_input">
                                            <input
                                                type="text"
                                                className="placestitle"
                                                onChange={handleSplitNew}
                                                id="title_2"
                                                placeholder="Add a place"
                                            />
                                            <textarea
                                                type="text"
                                                className="placesdescription"
                                                onChange={handleSplitNew}
                                                id="description_2"
                                                placeholder="Add notes,links, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="place_container">
                                    <div className="places_form">
                                        <input
                                            type="text"
                                            className="type"
                                            onChange={handleSplitNew}
                                            id="type_3"
                                            placeholder='Add a Title(e.g., "Restaurants", "Museums")'
                                        />
                                    </div>
                                    <div className="new_place">
                                        <div className="places_input">
                                            <input
                                                type="text"
                                                className="placestitle"
                                                onChange={handleSplitNew}
                                                id="title_3"
                                                placeholder="Add a place"
                                            />
                                            <textarea
                                                type="text"
                                                className="placesdescription"
                                                onChange={handleSplitNew}
                                                id="description_3"
                                                placeholder="Add notes,links, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <button
                            className="save"
                            type="submit"
                            onClick={handleNewGuide}
                        >
                            Save Changes
                        </button>
                    </form>
                </div >
            </>
            : ""
    )
}
