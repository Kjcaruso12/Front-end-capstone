import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getAllUserGuides, getcurrentGuide, getCurrentUser, getLocations, postUserGuide } from "../ApiManager"
import "./Guide.css"
import { BsBookmarkStarFill } from "react-icons/bs"
import Settings from "../../Settings"


export const Guide = () => {
    const [guide, setGuide] = useState({})
    const [userGuides, setAllUserGuides] = useState([])
    const [places, setPlaces] = useState([])
    const [user, setUser] = useState({})
    const history = useHistory()

    const { guideId } = useParams()

    const totalFavorites = (guide) => {
        const allUserGuides = userGuides?.filter(userGuide => userGuide.guideId === guide.id)
        const numberOfFavorites = allUserGuides?.filter(guide => guide.author === false).length
        return numberOfFavorites
    }

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

    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
        }, []
    )

    useEffect(
        () => {
            getAllUserGuides()
                .then(setAllUserGuides)
        }, []
    )

    const handleFavorites = () => {
        const newUserGuide = {
            userId:  parseInt(Settings.currentUser),
            guideId: guide.id,
            author: false
        }
        postUserGuide(guide.id)
    }


    return (
        <>
            <div className="guide__container">
                <div className="editorContainer">
                    <div className="planpage_container_maxWidth">
                        <div className="planpage_container position-relative planPageContainer_noMargin">
                            <div className="planpage_container position-relative d-print-none planPageHeader__guide">
                                <div className="planPageHeader__imgContainer w-100 position-absolute">
                                    <img className="planPageHeader__image w-100 object-fit-cover" src={guide?.photo?.imgPath} alt="travel image" />
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
                                                <div className="d-flex flex-column my-4">
                                                    <div className="d-block d-sm-flex align-items-center mb-2">
                                                        <div className="d-flex flex-column flex-grow-1 mr-4">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div className="mr-3">
                                                                    <div className="position-relative">
                                                                        <img alt={`Profile picture for ${user?.username}`} src={user?.photo?.imgPath} className="Bubble Bubble__size__md ImageBubble" />
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <div className="AuthorViewInnter__author d-flex flex-row align-items-center">
                                                                        <span className="ProfilePageNameLink">{user.username}</span>
                                                                    </div>
                                                                    <div className="d-md-flex flex-row flex-wrap AuthorViewInner__updated text-muted">
                                                                        <div className="text-nowrap">{guide?.dateEdited}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 mt-sm-0">
                                                            <div className="d-flex align-items-center">
                                                                <button className="LargeIconButton" type="button"
                                                                onClick={handleFavorites}>
                                                                    <span className="LargeIconButton__icon LargeIconButton__blackColor">
                                                                        {BsBookmarkStarFill()}
                                                                    </span>
                                                                    <span className="ml-2"></span>
                                                                    <span className="sr-only">{totalFavorites(guide)}</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1"></div>
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
                    <div className="tripText">
                        <div className="big_div">
                            <h2 className="guide_descriptiontitle">Brief description</h2>
                            <div className="description">
                                ${guide.description}
                            </div>
                        </div>
                        <div className="big_div">
                            <h2 className="guide_tiptitle">General Tips</h2>
                            <div className="tips" />
                            {guide.tips}
                        </div>
                        {places.length > 0 ?
                            places?.map((loc, index) => {
                                return <div className="place_container" key={index}>
                                    <div className="place_type" >
                                        <h2 className="launch">{loc.type}</h2>
                                    </div>
                                    <div className="place_title">
                                        <h3>{loc.title}</h3>
                                    </div>
                                    <div className="place_decscription">
                                        <p>{loc.description}</p>
                                    </div>
                                </div>
                            })
                            : ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


{/* <>
    <div className="PlacesDocument__negativeOffset">
        <div className="d-flex flex-row-reverse w-100 EditorContainer__printable">
            <div className="EditorContainer position=relative">
                <div className="EditorContainer__inner mw-100">
                    <div>
                        <span className="FixedAspectContainer ">
                            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" className="FixedAspectContainer__1-1 FixedAspectContainer__sm-3-2 FixedAspectContainer__md-4-3 FixedAspectContainer__lg-2-1" alt />
                            <span className="FixedAspectContainer__child">
                                <div className="absolute-fill HeaderImageOverlay__scrim"></div>
                                <img alt src={guide?.photo?.imgPath} className="w-100 object-fit-cover h-100" />
                                <div className="position-absolute w-100 HeaderImageOverlay__header">
                                    <h1 className="font-weight-bold mb-0">{guide?.title}</h1>
                                    <div className="mt-1">
                                        <a href={`/guides/${guide.cityId}`}>
                                            <div className="badge badge-whiteDangerous Badge__whiteDangerous text-nowrap Badge__badge mr-1">
                                                <h3 className="CategoryBadges__subheading badge">{guide?.city?.name + " guide"}</h3>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="d-flex flex-row-reverse w-100 EditorContainer__printable">
        <div className="EditorContainer position-relative">
            <div className="EditorContainer__inner">
                <div className="PlanViewPageContainerPad">
                    <div className="d-flex flex-column my-4">
                        <div className="d-block d-sm-flex align-items-center mb-2">
                            <div className="d-flex flex-column flex-grow-1 mr-4">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="mr-3">
                                        <div className="position-relative">
                                            <a className="ClickTarget__link ImageBubble__button" href="/u/dart">
                                                <img alt={`Profile picture for ${user?.username}`} src={user?.photo?.imgPath} className="Bubble Bubble__size__md ImageBubble" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <div className="AuthorViewInnter__author d-flex flex-row align-items-center">
                                            <a className="ProfilePageNameLink" href="/u/dart">{user.username}</a>
                                        </div>
                                        <div className="d-md-flex flex-row flex-wrap AuthorViewInner__updated text-muted">
                                            <div className="text-nowrap">{guide?.dateEdited}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 mt-sm-0">
                                <div className="d-flex align-items-center">
                                    <button className="LargeIconButton" type="button">
                                        <span className="LargeIconButton__icon LargeIconButton__blackColor">
                                            {BsBookmarkStarFill()}
                                        </span>
                                        <span className="ml-2"></span>
                                        <span className="sr-only">{totalFavorites(guide)}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow-1"></div>
                    </div>
                    <div className="mb-4">
                        <div id="BoardAndMap__section-818145015" className="mt-4 mb-5">
                            <div role="button" className="mt-2 font-weight-bold cursor-pointer">
                                <div className="d-flex align-items-center justify-content-center w-100">
                                    <h2 className="font-weight-bold mb-0 line-height-1 mr-auto">
                                        <span className="Heading__underlineContainer d-inline-block position-relative">
                                            "insert type"
                                            <span className="Heading__underline Heading__extendedAlways"></span>
                                        </span>
                                    </h2>
                                    <button type="button" tabIndex="0" className="Button Button__flat Button__md Button__shape__pill overflow-hidden Button__withIcon Button__iconOnly px-0" color="flat">
                                        <div className="Button__icon text-center flex-grow-1">
                                            {RiArrowDropDownLine()}
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="collapse show">
                                <div className="mt-2">
                                    {
                                        places?.map((place, index) => {
                                            <div className="BoardAndMap__block_817645644">
                                                <div className="d-flex justify-content-center align-items-center position-relative my-2">
                                                    <div className="BoardBlockSeparator__horizontalLine BoardBlockSeparator__selected"></div>
                                                </div>
                                                <div className="cursor-pointer clearfix BoardPlaceView__selected PlaceView__selectable PlaceView__selected">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 minw-0">
                                                            <h3 className="font-weight-bold mb-0 font-size-18 font-weight-bold text-left default-letter-spacing default-line-height">{place?.title}</h3>
                                                            <div className="mt-2">
                                                                <div className="mt-2">
                                                                    <div className="QuillHTMLRenderer ">
                                                                        <div className="QuillParagraph">
                                                                            {place?.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
                                } */}
