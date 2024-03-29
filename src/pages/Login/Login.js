import { useState } from "react";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoging, setIsLoging] = useState(false);

    const loginUser = async (event) => {
        try {
            event.preventDefault();
            setIsLoging(true);
            console.log(`email: ${email}`);
            console.log(`password: ${password}`);
            setIsLoging(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login">
            <form onSubmit={loginUser}>
                <div className="login--form">
                    <h1>Login</h1>
                    <div className="form">
                        <div className="form--element">
                            <h3>email</h3>
                            <input
                                className="entry"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form--element">
                            <h3>password</h3>
                            <input
                                className="entry"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {isLoging ? <p>Loging In...</p> : <button id="login--button" type="submit">login</button>}
                </div>
            </form>
        </div>
    )
}

export default Login;