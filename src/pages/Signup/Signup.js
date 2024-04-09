import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationApiRequests } from "../../apiRequests";
import "./Signup.css";

const Signup = () => {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isRegistering, setIsRegistering] = useState(false);
    const navigateTo = useNavigate();

    const registerUser = async (event) => {
        try {
            event.preventDefault();
            setIsRegistering(true);
            const registrationDetails = {
                email,
                username,
                password
            };
            const response = await authenticationApiRequests.register(registrationDetails);
            if (response.status === 201) {
                navigateTo("/")
            }
            setIsRegistering(false);
        } catch (error) {
            console.log(error);
            setIsRegistering(false);
        }
    }

    return (
        <div className="signup">
            <form onSubmit={registerUser}>
                <div className="signup--form">
                    <h1>Signup</h1>
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
                            <h3>username</h3>
                            <input
                                className="entry"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
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
                                minLength={6}
                                required
                            />
                        </div>
                    </div>
                    {isRegistering ? <h3>Registering user</h3> : <button id="signup--button" type="submit">submit</button>}
                </div>
            </form>
        </div>
    )
}

export default Signup;