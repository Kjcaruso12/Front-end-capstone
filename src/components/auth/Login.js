import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"
import useSimpleAuth from "../../hooks/useSimpleAuth";

export const Login = () => {
    const [credentials, syncAuth] = useState({
        email: "",
        password: ""
    })
    const existDialog = useRef()
    const history = useHistory()

    const { login } = useSimpleAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        login(credentials.email, credentials.password)
            .then(exists => {
                if (exists) {
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    const handleUserInput = (event) => {
        const copy = {...credentials}
        copy[event.target.id] = event.target.value
        // syncAuth() is the state setting function for credentials
        syncAuth(copy)
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2>Log in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange={handleUserInput}
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password"> Password </label>
                        <input type="text"
                            onChange={handleUserInput}
                            id="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}