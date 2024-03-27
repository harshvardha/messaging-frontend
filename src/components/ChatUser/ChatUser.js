import blankProfile from "../../images/blank-profile-picture.png";
import "./ChatUser.css";

const ChatUser = ({ setIsChatAreaOpen }) => {
    return (
        <div className="chatUser" onClick={() => setIsChatAreaOpen(true)}>
            <div className="chatUser--description">
                <img id="chatUser--blankProfile" src={blankProfile} alt="" />
                <div className="description--about">
                    <p id="chatUser--username">Harshvardhan Singh</p>
                    <p id="chatUser--recentMessage">Ec2 instance pe</p>
                </div>
            </div>
            <p id="chatUser--createdOn">wednesday</p>
        </div>
    )
}

export default ChatUser;