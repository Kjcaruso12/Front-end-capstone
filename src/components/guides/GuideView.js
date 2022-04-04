import { Guide } from "./Guide"

export const GuideView = ({ currentGuide, guides, photos, index, lastGuide }) => {
    //need fetch userguide, with guide expanded, and photo expanded for their profile picture
    //then next to get the photo id from JSON if its one I have, or need to fetch the img by using cityId
    const matchedPhoto = photos.find(photo => photo.id === currentGuide.photoId )


    return (

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-5">
                <div className="card d-flex flex-column cursor-pointer position-relative">
                    <div className="d-flex flex-column">
                        <a className="d-block rounded" tabIndex="-1" href={matchedPhoto.imgPath}>
                            <span className="fixedAsepectContainer">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" className="fixedAspectContainer__3-2 fixedAspectContainer__md 3-2 fixedAspectContainer__lg 3-2" alt/>

                            </span>
                        </a>
                    </div>
                </div>
            </div>

            )
}