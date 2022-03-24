export const Logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("user_explorer")
        sessionStorage.removeItem("user_explorer")
    }