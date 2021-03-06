import { Link } from "react-router-dom"
import { Logout } from "../auth/Logout"

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

export const SideNavDropDown = ({ isOpen }) => {

    return (
        isOpen ?
            <div className="sidenavbar">
                <Link
                    className="sidenav_link"
                    to="/">
                    Home
                </Link>
                <Link
                    className="sidenav_link"
                    to="/guides">
                    Browse Guides
                </Link>
            </div>
            : ""
    )
}