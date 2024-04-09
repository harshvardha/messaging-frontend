import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authenticationApiRequests } from "../../apiRequests";
import { connectSocket } from "../../sockets/SocketConnection";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoging, setIsLoging] = useState(false);
    const navigateTo = useNavigate();

    const loginUser = async (event) => {
        try {
            event.preventDefault();
            setIsLoging(true);
            const loginDetails = {
                email,
                password
            };
            const response = await authenticationApiRequests.login(loginDetails);
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("access_token", data.accessToken);
                localStorage.setItem("user_id", data.userId);
                connectSocket(data.userId);
                navigateTo("/messaging");
            }
            setIsLoging(false);
        } catch (error) {
            console.log(error);
            setIsLoging(false);
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
                    <div style={{ display: "flex", columnGap: "1rem" }}>
                        {isLoging ? <p>Loging In...</p> : <button id="login--button" type="submit">login</button>}
                        <Link to={"/signup"} id="signup--button" style={{ textDecoration: "none", color: "black" }}>signup</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;