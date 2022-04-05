import React from "react"
import { Link } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"

import "./GuideView.css"

export const GuideView = ({ YourGuide, userGuides, photos, lastGuide, index }) => {

    const matchPhoto = photos?.find(pho => pho.id === YourGuide.photoId)

    const totalFavorites = (YourGuide) => {
        const allUserGuides = userGuides?.filter(userGuide => userGuide.guideId === YourGuide.id)
        const numberOfFavorites = allUserGuides?.filter(guide => guide.author === false).length
        return numberOfFavorites
}

    return (
        <li className="single_guide">
            {YourGuide && matchPhoto?
                <div className="guiderow">
                    <div className="guide_link">
                            <Link to={`/guides/${YourGuide.id}`}>
                                <img className="guide_image" src={matchPhoto?.imgPath} alt="travel image" />
                            </Link>
                    </div>
                    <div className="guide_details">
                        <div className="title">
                            {YourGuide.title}
                        </div>
                        <div className="favorites">
                            {AiFillStar()}
                            <div className="favorites_count">
                                {totalFavorites(YourGuide)}
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }
            {
                lastGuide !== index ?
                    <hr className="guide_divider" />
                    : ""
            }
        </li>
    )
}