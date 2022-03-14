export const existingLoginUserCheck = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const existingRegisterUserCheck = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
        .then(res => res.json())
}

export const getLocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(response => response.json())
}

export const postUser = (users) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    })
}