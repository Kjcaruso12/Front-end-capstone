import { fetchIt } from "../Fetch"
import Settings from "../Settings"

export const existingLoginUserCheck = (email) => {
    return fetchIt(`${Settings.remoteURL}/users?email=${email}`)
}

export const existingRegisterUserCheck = (user) => {
    return fetchIt(`${Settings.remoteURL}/users?email=${user.email}`)

}

export const getLocations = () => {
    return fetchIt(`${Settings.remoteURL}/locations`)

}

export const getPhotos = () => {
    return fetchIt(`${Settings.remoteURL}/photos`)

}

export const getYourGuides = (id) => {
    return fetchIt(`${Settings.remoteURL}/userguides?userId=${id}&_expand=guide`)
}

export const getAllUserGuides = (id) => {
    return fetchIt(`${Settings.remoteURL}/userguides`)
}

export const postUser = (user) => {
    return fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(user))
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

