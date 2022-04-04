import { fetchIt } from "../Fetch"
import Settings from "../Settings"

const user = Settings.currentUser

export const existingLoginUserCheck = (email) => {
    return fetchIt(`${Settings.remoteURL}/users?email=${email}`)
}

export const existingRegisterUserCheck = (user) => {
    return fetchIt(`${Settings.remoteURL}/users?email=${user.email}`)
}

export const getAllUsers = () => {
    return fetchIt(`${Settings.remoteURL}/users`)
}

export const getCurrentUser = () => {
    return fetchIt(`${Settings.remoteURL}/users/${Settings.currentUser}`)
}

export const getLocations = (guideId) => {
    return fetchIt(`${Settings.remoteURL}/locations?guideId=${guideId}&expand=guide`)
}

export const getPhotos = () => {
    return fetchIt(`${Settings.remoteURL}/photos`)
}

export const getOtherUserGuides = () => {
    return fetchIt(`${Settings.remoteURL}/userguides?expand=guide`)
}

export const getAllGuides = () => {
    return fetchIt(`${Settings.remoteURL}/guides`)
}

export const getcurrentGuide = (guideId) => {
    return fetchIt(`${Settings.remoteURL}/guides/${guideId}`)
}

export const getYourGuides = (user) => {
    return fetchIt(`${Settings.remoteURL}/userguides?userId=${user}&_expand=guide`)
}

export const getAllUserGuides = () => {
    return fetchIt(`${Settings.remoteURL}/userguides`)
}


export const postGuide = (location) => {
    return fetchIt(`${Settings.remoteURL}/guides`, "POST", JSON.stringify(location))
}

export const postUserGuide = (location) => {
    return fetchIt(`${Settings.remoteURL}/userguides`, "POST", JSON.stringify(location))
}

export const postGuideLocations = (guideLocation) => {
    return fetchIt(`${Settings.remoteURL}/locations`, "POST", JSON.stringify(guideLocation))
}

export const postUser = (user) => {
    return fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(user))
}

export const putLocations = (location) => {
    return fetchIt(`${Settings.remoteURL}/locations/${location.id}`, "PUT", JSON.stringify(location))
}

export const putGuide = (guide) => {
    return fetchIt(`${Settings.remoteURL}/guides/${guide.id}`, "PUT", JSON.stringify(guide))
}

export const putUser = (user) => {
    return fetchIt(`${Settings.remoteURL}/users`, "PUT", JSON.stringify(user))
}

export const deleteUser = (userId) => {
    return fetchIt(`${Settings.remoteURL}/users/${userId}`, "DELETE")
}

export const deleteGuide = (userGuide) => {
    return fetchIt(`${Settings.remoteURL}/userguides/${userGuide.id}`, "DELETE")
}

export const deleteAllSavedGuides = (id) => {
    //fetch all userGuides for currernt user
    return fetchIt(`${Settings.remoteURL}/userguides/userId=${id}`)
    .then((userGuides) => {
        //iterate to get the array of saved guides where author property is false
        const matchedGuides = userGuides.map((guide) => {
            return guide.author === false
        })
        for (const savedGuide of matchedGuides) {
            fetchIt(`${Settings.remoteURL}/userguides/${savedGuide.id}`, "DELETE")
        }
    })
}

