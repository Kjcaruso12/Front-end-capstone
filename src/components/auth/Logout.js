import { useHistory } from "react-router-dom"

export const Logout = () => {
    const history = useHistory()
    sessionStorage.removeItem("user_explorer")
    history.push("/")
}