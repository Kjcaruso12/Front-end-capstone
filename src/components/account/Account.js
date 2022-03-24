import { useEffect, useState } from "react"
import { getCurrentUser, getPhotos, putUser } from "../ApiManager"
import { useModalAccount } from "../../hooks/useModal"
import { AccountDialog } from "./AccountDialog"
import { useHistory } from "react-router-dom"


export const Account = (props) => {
    const [profilePic, setProfilePic] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    let { toggleAccountDialog, accountModalIsOpen } = useModalAccount("#dialog--account")
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
            if (e.keyCode === 27 && accountModalIsOpen) {
                // run toggleDialog()
                toggleAccountDialog()
            }
        }
        // adds eventListener
        window.addEventListener("keyup", handler)
        console.log("event useEffect fired")
        // removes eventListener?
        return () => window.removeEventListener("keyup", handler)
    }, [toggleAccountDialog, accountModalIsOpen])

    const handleUpdates = () => {
        putUser(newInfo)
            .then(history.push("/dashboard"))
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
                    <AccountDialog toggleAccountDialog={toggleAccountDialog} currentUser={currentUser} />
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
                                    defaultValue={currentUser.username}
                                    onChange={handleUserInput}
                                    id="username"
                                    className="form-field"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="password"> Password </label>
                                <input type="text"
                                    defaultValue={currentUser.password}
                                    onChange={handleUserInput}
                                    id="password"
                                    className="form-field"
                                    required />
                            </fieldset>
                            <fieldset>
                                <button
                                    className="update"
                                    type="submit"
                                    onClick={() => {
                                        handleUpdates()
                                    }}
                                >
                                    Save Changes
                                </button>
                            </fieldset>
                            <fieldset>
                                <button
                                    className="delete"
                                    type="delete"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleAccountDialog()}}
                                    >
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