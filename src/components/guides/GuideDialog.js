import React from "react"
import { deleteAllSavedGuides, deleteGuide } from "../ApiManager"
import Settings from "../../Settings"

export const GuideDialogSingleDelete = ({ toggleSingleDialog, userGuide }) => {

    return (
        <dialog id="dialog--guide" className="dialog--guide">
            <div>
                <h2>Are you sure you want to delete this guide?</h2>
            </div>
            <div>
                <button
                    onClick={() => {
                        deleteGuide(userGuide)
                    }
                    }>
                    Confirm
                </button>
                <button
                    id="closeButton"
                    onClick={toggleSingleDialog}>
                    Cancel
                </button>
            </div>
        </dialog>
    )
}

export const GuideDialogAllDelete = ({ toggleAllDialog }) => {

    return (
        <dialog id="dialog--guides" className="dialog--guides">
            <div>
                <h2>Are you sure you want to clear Saved Guides?</h2>
            </div>
            <div>
                <button
                    onClick={() => {
                        deleteAllSavedGuides(Settings.currentUser)
                    }
                    }>
                    Confirm
                </button>
                <button
                    id="closeButton"
                    onClick={toggleAllDialog}>
                    Cancel
                </button>
            </div>
        </dialog>
    )
}