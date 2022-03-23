


return (
    <main className="container--account">
        <section>
            <form className="form--account">
                <h2>Log in</h2>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email"
                        onChange={evt => setEmail(evt.target.value)}
                        className="form-control"
                        placeholder="Email address"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input type="text"
                        onChange={evt => setPassword(evt.target.value)}
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