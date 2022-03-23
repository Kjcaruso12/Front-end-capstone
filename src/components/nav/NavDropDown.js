import { Link } from "react-router-dom"
import { Logout } from "../auth/Logout"

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export const ProfileNavDropDown = ({ open }) => {

    return (
        open ?
        <div className="dropdown">
            <Link
                className="profile_link"
                to="/account">
                Your Account
            </Link>
            <Link
                onClick={() => {
                    Logout()
                }}
                className="profile_link" to="/home">
                Log Out
            </Link>
        </div>
        : ""
    )
}