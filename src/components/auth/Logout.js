export const Logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("kennel_token")
        sessionStorage.removeItem("kennel_token")
    }