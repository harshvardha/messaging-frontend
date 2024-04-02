import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Message from "../Message/Message";
import { messageApiRequests } from "../../apiRequests";
import { getMessageTime } from "../../utils/timeAgo";
import blankProfile from "../../images/blank-profile-picture.png";
import "./ChatArea.css";

const ChatArea = ({
    chatAreaUserProfilePicUrl,
    chatAreaUsername,
    chatAreaUserId,
    userConnections,
    setUserConnections
}) => {
    const [message, setMessage] = useState();
    const [userMessages, setUserMessages] = useState([]);

    const sendMessage = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const messageDetails = {
                recieverId: chatAreaUserId,
                description: message
            };
            const response = await messageApiRequests.createMessage(accessToken, messageDetails);
            if (response.status === 201) {
                setUserMessages(prev => [...prev, response.data]);
                const connectionIndex = userConnections.findIndex(connection => connection.userId === chatAreaUserId);
                if (connectionIndex > -1 && connectionIndex !== 0) {
                    setUserConnections(prev => {
                        let temp = prev[connectionIndex];
                        prev[connectionIndex] = prev[0];
                        prev[0] = temp;
                        return prev;
                    });
                } else {
                    const newConnection = {
                        userId: chatAreaUserId,
                        profilePicUrl: response.data.reciever.profilePicUrl,
                        username: response.data.reciever.username,
                        description: response.data.description,
                        seen: response.data.seen,
                        delivered: response.data.delivered,
                        createdAt: response.data.createdAt
                    }
                    setUserConnections(prev => [newConnection, ...prev]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await messageApiRequests.getMessages(accessToken, chatAreaUserId);
                if (response.status === 200) {
                    setUserMessages(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllMessages();
    }, [])

    return (
        <div className="chatArea">
            <div className="chatArea--header">
                {chatAreaUserProfilePicUrl ?
                    <img id="blankProfile" src={chatAreaUserProfilePicUrl} alt="" /> :
                    <img id="blankProfile" src={blankProfile} alt="" />}
                <p>{chatAreaUsername}</p>
            </div>
            <div className="chatArea--chats">
                {userMessages?.map(msg =>
                    <Message
                        isSentMessage={msg.reciever === chatAreaUserId ? true : false}
                        isGroupMessage={false}
                        profilePicUrl={""}
                        username={""}
                        messageDescription={msg.description}
                        messageTime={getMessageTime(msg.createdAt)}
                        seen={msg.seen}
                        delivered={msg.delivered}
                    />
                )}
            </div>
            <div className="chatArea--footer">
                <input
                    id="chatArea--typeMessage"
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type a message"
                />
                {message && <IoSend id="chatArea--sentMessage" onClick={sendMessage} />}
            </div>
        </div>
    )
}

export default ChatArea;