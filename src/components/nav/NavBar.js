import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPhotos } from "../ApiManager"
import { GiHamburgerMenu } from "react-icons/gi"
import { getCurrentUser } from "../ApiManager"
import "./NavBar.css"
import { ProfileNavDropDown, SideNavDropDown } from "./NavDropDown"

export const NavBarLoggedOut = () => {
    return (
        <ul className="navbar">
            <div className="left_nav">
                <li className="navbar__logo">
                    <img className="logo" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNccW7TWXzwbtB0dN03i3TJoRFeGrrI_CGTg&usqp=CAU"} alt="Company Logo" width="75" height="75" />
                </li>
                <li>
                    <h2 className="company">AdventureBound</h2>
                </li>
            </div>
            <div className="right_nav">
                <li className="navbar__register">
                    <Link className="navbar__link" to="/register">Sign Up</Link>
                </li>
                <li className="navbar__login ">
                    <Link className="navbar__link" to="/login">Sign In</Link>
                </li>
            </div>
        </ul>
    )
}

export const NavBarLoggedIn = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [photos, setPhotos] = useState([])
    // const [currentUser, setCurrentUser] = useState({})
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(
        () => {
            getPhotos()
                .then(setPhotos)

        }, []
    )

    useEffect(
        () => {
            getCurrentUser()
                .then(setCurrentUser)
        }, []
    )



    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            setOpen(false)
        }
    }

    // window.onclick = function (event) {
    //     if (!event.target.matches('.sidenav_button')) {
    //         setIsOpen(false)
    //     }
    // }


    const matchingPicture = photos?.find(photo => photo?.id === currentUser?.photoId)

    return (
        <ul className="navbar">
            <div className="left_nav">
                <li className="sidenav__dropdown">
                    <button
                        className="sidenav_button"
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}>
                        {GiHamburgerMenu()}
                    </button>
                    <SideNavDropDown isOpen={isOpen} />
                </li>
                <li className="navbar__logo">
                    <img className="logo" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNccW7TWXzwbtB0dN03i3TJoRFeGrrI_CGTg&usqp=CAU"} alt="Company Logo" width="75" height="75" />
                </li>
                <li>
                    <h2 className="company">AdventureBound</h2>
                </li>
            </div>
            <div className="right_nav">
                <li className="navbar__search">
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            onKeyPress={(e) => {
                                if (e.charCode === 13) {
                                    const access_key = "d40d6975f689549be1b6918c81574d47"
                                    const secret_key = "dd2a53212a1a6ac42b9b07b6fbccff26"
                                    var auth_key = btoa(`${access_key}:${secret_key}`)
                                    fetch(`https:/api.roadgoat.com/api/v2/destinations/auto_complete?q=${e.target.value}`, {
                                        'method': 'GET',
                                        'headers': {
                                            'Authorization': `Basic ${auth_key}`
                                        }
                                    })
                                        .then(res => res.json())
                                        .then((data) => {
                                            console.log(data)
                                        })
                                }
                            }}
                            id="city_search"
                            placeholder='Search for a city...'
                        />
                    </div>
                </li>
                <li className="profile__dropdown ">
                    <button className="profile_button">
                        <img className="dropbtn" src={matchingPicture?.imgPath} alt="Profile-image"
                            onClick={() => {
                                setOpen(!open)
                            }} />
                    </button>
                    <ProfileNavDropDown open={open} />
                </li>
            </div>
        </ul >
    )
}

