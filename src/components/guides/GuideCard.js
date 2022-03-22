import React, { useState } from "react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"


export const GuideCard = ({ YourGuide, confirmGuideDelete, photos, lastGuide, index }) => {

    const matchphoto = photos.find(photo => photo.id === YourGuide.guide.photoId)

    return (

        <>
            {YourGuide?
                <li>
                    <div className="guiderow">
                        <div className="guide_image">
                            <Link to={`/guides/create/${YourGuide.id}`}>
                                <img className="guide_image" src={matchphoto?.imgPath} alt="travel image" />
                            </Link>
                        </div>
                        <div className="title">
                            {YourGuide.guide.title}
                        </div>
                        <div className="guiderow__title-delete">
                            <button className="guide__delete"
                                onClick={() => { confirmGuideDelete(YourGuide) }}>
                                {MdDelete()}
                            </button>
                        </div>
                    </div>
                    {
                        lastGuide !== index ?
                        <div>
                            <hr className="guide_divider"/>
                        </div>
                        :""
                    }
                </li>
                : ""
            }

            { }
        </>
    )
}