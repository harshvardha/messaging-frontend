import { BiCheck } from "react-icons/bi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import blankProfileImage from "../../images/blank-profile-picture.png";
import "./Message.css";

const sentMessageParentStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    float: "right",
    paddingTop: "1rem"
}

const recievedMessageParentStyle = {
    width: "50%",
    marginTop: "1rem",
    marginBottom: "1rem"
}

const groupMessageAboutStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.625rem",
    alignItems: "flex-start"
}

const groupMessageRecievedStyle = {
    display: "flex",
    columnGap: "0.625rem",
    alignItems: "flex-start",
    width: "50%",
    marginBottom: "1rem",
    marginTop: "1rem"
}

const sentMessageStyle = {
    marginbottom: "1rem"
}

const Message = ({
    isSentMessage,
    isGroupMessage,
    profilePicUrl,
    username,
    messageDescription,
    messageTime,
    seen,
    delivered
}) => {
    return (
        <div className="message" style={isSentMessage ? sentMessageParentStyle : isGroupMessage ? groupMessageRecievedStyle : recievedMessageParentStyle}>
            {isGroupMessage && !isSentMessage && <img id="messageProfilePic" src={profilePicUrl || blankProfileImage} alt="" />}
            <div className="message--message" style={isSentMessage ? { backgroundColor: "#005c4b", width: messageDescription.length <= 77 ? "fit-content" : "50%" } : { backgroundColor: "#202c33", width: "fit-content" }}>
                <div className="message--about" style={isSentMessage ? sentMessageStyle : isGroupMessage ? groupMessageAboutStyle : {}}>
                    {(!isSentMessage && isGroupMessage) && <p id="messageSender">{username || ""}</p>}
                    <p id="messageDescription">{messageDescription || ""}</p>
                </div>
                <div className="message--timeAndStatus">
                    <p id="messageTime">{messageTime}</p>
                    {isSentMessage && <BiCheck id="messageSent" style={{ color: "hsla(0, 0%, 100%, 0.6)" }} />}
                </div>
            </div>
        </div >
    )
}

export default Message;