import React, { useState } from "react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import "./GuideList.css"

export const GuideCard = ({ YourGuide, confirmGuideDelete, photos, lastGuide, index, userGuides }) => {
    const matchphoto = photos?.find(photo => photo.id === YourGuide.guide.photoId)

    const totalFavorites = (YourGuide) => {
        const allUserGuides = userGuides?.filter(userGuide => userGuide.guideId === YourGuide.id)
        const numberOfFavorites = allUserGuides?.filter(guide => guide.author === false).length
        return numberOfFavorites
    }

    const isAuthor = YourGuide.author
    return (

        <>
            {YourGuide?
                <div className="guiderow">
                    <div className="guide_link">
                        {isAuthor?
                        <Link to={`/guides/create/${YourGuide.id}`}>
                            <img className="guide_image" src={matchphoto?.imgPath} alt="travel image" />
                        </Link>
                        :
                        <Link to={`/guides/${YourGuide.guideId}`}>
                            <img className="guide_image" src={matchphoto?.imgPath} alt="travel image" />
                        </Link>
                        }
                    </div>
                    <div className="guide_details">
                        <div className="title">
                            {YourGuide.guide.title}
                        </div>
                        <div className="favorites">
                            {AiFillStar()}
                            <div className="favorites_count">
                                {totalFavorites(YourGuide)}
                            </div>
                        </div>
                    </div>
                    <button className="guide__delete"
                        onClick={() => { confirmGuideDelete(YourGuide) }}>
                        {MdDelete()}
                    </button>
                </div>
                : ""
            }
            {
                lastGuide !== index ?
                    <hr className="guide_divider" />
                    : ""
            }
        </>
    )
}