import React, { useRef, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import "./Login.css"
import { existingRegisterUserCheck, postUser } from "../ApiManager"

export const Register = (props) => {
    const [user, setuser] = useState({})
    const [password, setPasswordCheck] = useState("")
    const [passCheck, passwordnotValid] = useState(false)
    const conflictDialog = useRef()


    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (user.password !== password) {
            passwordnotValid(true)
        }
        else {
            existingRegisterUserCheck(user)
                .then(user => !!user.length)
                .then((userExists) => {
                    if (!userExists) {
                        postUser(user)
                            .then(res => res.json())
                            .then(createdUser => {
                                if (createdUser.hasOwnProperty("id")) {
                                    sessionStorage.setItem("user_explorer", createdUser.id)
                                    history.push("/")
                                }
                            })
                    }
                    else {
                        conflictDialog.current.showModal()
                    }
                })
        }
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setuser(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Get started with a free account</h1>
                <section className="link--login">
                    <div>Already have an account? <Link to="/login">Log in here</Link></div>
                </section>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateUser}
                        type="text" id="username" className="form-control"
                        placeholder="Enter Username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type="text" id="password" className="form-control"
                        placeholder="Enter Password" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Confirm Password </label>
                    <input onChange={(evt) => {
                        setPasswordCheck(evt.target.value)
                    }
                    }
                        type="text" id="password" className="form-control"
                        placeholder="Enter Password" required autoFocus />
                </fieldset>
                {
                    passCheck ?
                        <div className="password_not_matching">
                            Passwords do not match
                        </div>
                        : ""
                }
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
