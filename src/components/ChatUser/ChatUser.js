import blankProfile from "../../images/blank-profile-picture.png";
import "./ChatUser.css";

const ChatUser = ({
    userId,
    profilePicUrl,
    username,
    recentMessage,
    setIsChatAreaOpen,
    setChatAreaUserId,
    setChatAreaUserProfilePicUrl,
    setChatAreaUsername,
    dateOrDay
}) => {
    return (
        <div className="chatUser" onClick={() => {
            setIsChatAreaOpen(true);
            setChatAreaUserId(userId);
            setChatAreaUserProfilePicUrl(profilePicUrl);
            setChatAreaUsername(username);
        }}>
            <div className="chatUser--description">
                {profilePicUrl ? <img id="chatUser--blankProfile" src={profilePicUrl} alt="" /> : <img id="chatUser--blankProfile" src={blankProfile} alt="" />}
                <div className="description--about">
                    <p id="chatUser--username">{username}</p>
                    <p id="chatUser--recentMessage">{recentMessage}</p>
                </div>
            </div>
            <p id="chatUser--createdOn">{dateOrDay}</p>
        </div>
    )
}

export default ChatUser;