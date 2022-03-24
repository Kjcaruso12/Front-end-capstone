import React from "react"
import { deleteUser } from "../ApiManager"
import { useHistory } from "react-router-dom"

export const AccountDialog = ({ toggleAccountDialog, currentUser }) => {
    const history = useHistory()

    const handleDeleteAccount = (e) => {
        e.preventDefault()

        deleteUser(currentUser.id)
            .then(() => {
                localStorage.removeItem("user_explorer")
            })
            .then(() => {
                history.push("/home")
            })
    }

    return (
        <dialog id="dialog--account" className="dialog--account">
            <div>
                <h2>Are you sure you want to delete your account? This is irreversible!</h2>
            </div>
            <div>
                <button
                    id="deletebtn"
                    onClick={handleDeleteAccount}
                    >
                    Confirm
                </button>
                <button
                    id="closeButton"
                    onClick={toggleAccountDialog}>
                    Cancel
                </button>
            </div>
        </dialog>
    )
}
