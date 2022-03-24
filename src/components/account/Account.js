import { useEffect, useState } from "react"
import { getCurrentUser, getPhotos, putUser } from "../ApiManager"
import useModal from "../../hooks/useModal"
import { AccountDialog } from "./AccountDialog"
import { useHistory } from "react-router-dom"


export const Account = () => {
    const [profilePic, setProfilePic] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    let { toggleDialog, modalIsOpen } = useModal("#dialog--account")
    const history = useHistory()
    const [newInfo, setNewInfo] = useState({
        username: currentUser?.username,
        email: currentUser?.email,
        password: currentUser?.password,
        photoId: profilePic?.id,
        id: currentUser?.id
    })

    useEffect(
        () => {
            getCurrentUser()
                .then(setCurrentUser)
        }
        , []
    )

    useEffect(
        () => {
            getPhotos()
                .then((photos) => {
                    const userPhoto = photos?.find(photo => photo.id === currentUser?.photoId)
                    return userPhoto
                })
                .then((userPhoto) => {
                    setProfilePic(userPhoto)
                })
        }, []
    )

    useEffect(() => {
        const handler = e => {
            // event keyCode = escape button and modalIsOpen
            if (e.keyCode === 27 && modalIsOpen) {
                // run toggleDialog()
                toggleDialog()
            }
        }
        // adds eventListener
        window.addEventListener("keyup", handler)
        console.log("event useEffect fired")
        // removes eventListener?
        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog, modalIsOpen])

    const handleUpdates = (e) => {
        e.preventDefault()
        putUser(newInfo)
            .then(history.push("/"))
    }

    const handleUserInput = (event) => {
        const copy = { ...newInfo }
        copy[event.target.id] = event.target.value
        setNewInfo(copy)
    }

    return (
        <>
            {currentUser ?
                <main className="container--account">
                    <AccountDialog toggleDialog={toggleDialog} currentUser={currentUser} />
                    <section>
                        <form className="form--account">
                            <h2>Your Account</h2>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input type="email"
                                    className="form-field"
                                    placeholder={currentUser.email}
                                    readOnly />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="username"> Username </label>
                                <input type="text"
                                    value={currentUser.username}
                                    onChange={handleUserInput}
                                    id="username"
                                    className="form-field"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="password"> Password </label>
                                <input type="text"
                                    value={currentUser.password}
                                    onChange={handleUserInput}
                                    id="password"
                                    className="form-field"
                                    required />
                            </fieldset>
                            <fieldset>
                                <button
                                    className="update"
                                    type="submit"
                                    onClick={handleUpdates}>
                                    Save Changes
                                </button>
                            </fieldset>
                            <fieldset>
                                <button
                                    className="delete"
                                    type="delete"
                                    onClick={toggleDialog}>
                                    Delete Account
                                </button>
                            </fieldset>
                        </form>
                    </section>
                </main>
                : ""
            }
        </>
    )
}