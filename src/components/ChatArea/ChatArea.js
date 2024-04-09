import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Message from "../Message/Message";
import { messageApiRequests } from "../../apiRequests";
import { getMessageTime } from "../../utils/timeAgo";
import { socket, isSocketConnected, connectSocket } from "../../sockets/SocketConnection";
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

    const updateConnectionsListOrder = (data) => {
        const connectionIndex = userConnections?.findIndex(connection => connection.userId === chatAreaUserId);
        if (connectionIndex > -1) {
            const temp = userConnections[connectionIndex];
            temp.description = data.description;
            const filteredConnections = userConnections.filter(connection => connection.userId !== chatAreaUserId);
            setUserConnections([temp, ...filteredConnections]);
        }
        else if (connectionIndex === -1) {
            const newConnection = {
                userId: chatAreaUserId,
                profilePicUrl: data.reciever.profilePicUrl,
                username: data.reciever.username,
                description: data.description,
                seen: data.seen,
                delivered: data.delivered,
                createdAt: data.createdAt
            };
            setUserConnections(prev => [newConnection, ...prev]);
        }
    }

    const sendMessage = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const messageDetails = {
                recieverId: chatAreaUserId,
                description: message
            };
            const response = await messageApiRequests.createMessage(accessToken, messageDetails);
            if (response.status === 201) {
                if (isSocketConnected) {
                    socket.emit("created_message", { messageId: response.data._id });
                }
                setUserMessages(prev => [...prev, response.data]);
                updateConnectionsListOrder(response.data);
                setMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewMessage = async (data) => {
        try {
            if (data.sender._id === chatAreaUserId) {
                setUserMessages(prev => [...prev, data]);
                updateConnectionsListOrder(data);
                socket.emit("recieved_message", { _id: data._id, senderId: data.sender._id, delivered: true });
                socket.emit("seen_message", { _id: data._id, senderId: data.sender._id, seen: true, delivered: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleMessageDelivered = (data) => {
        setUserMessages(prev => {
            const messageIndex = prev.findIndex(msg => msg._id === data._id);
            const temp = prev[messageIndex];
            temp.delivered = true;
            const filteredMessages = prev.filter(msg => msg._id !== data._id);
            filteredMessages.splice(messageIndex, 0, temp);
            return filteredMessages;
        });
    }

    const handleMessageSeen = (data) => {
        setUserMessages(prev => {
            const messageIndex = prev.findIndex(msg => msg._id === data._id);
            const temp = prev[messageIndex];
            temp.seen = true;
            const filteredMessages = prev.filter(msg => msg._id !== data._id);
            filteredMessages.splice(messageIndex, 0, temp);
            return filteredMessages;
        });
    }

    useEffect(() => {
        if (isSocketConnected) {
            socket.on("new_message", (data) => handleNewMessage(data));
            socket.on("message_seen", (data) => handleMessageSeen(data));
            socket.on("message_delivered", (data) => handleMessageDelivered(data));
        }
        else {
            connectSocket(localStorage.getItem("user_id"));
        }
        return () => {
            socket.off("new_message");
            socket.off("message_seen");
            socket.off(("message_delivered"));
        }
    }, [isSocketConnected]);

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await messageApiRequests.getMessages(accessToken, chatAreaUserId);
                if (response.status === 200) {
                    setUserMessages(response.data);
                    const userId = localStorage.getItem("user_id");
                    const undeliveredMessages = response.data.filter(msg => {
                        if ((msg.delivered === false || msg.seen === false) && msg.reciever === userId && msg.sender === chatAreaUserId) {
                            return msg;
                        }
                    });
                    if (undeliveredMessages.length > 0) {
                        for (const msg of undeliveredMessages) {
                            if (isSocketConnected) {
                                socket.emit("recieved_message", { _id: msg._id, senderId: msg.sender, delivered: true });
                                socket.emit("seen_message", { _id: msg._id, senderId: msg.sender, seen: true, delivered: true });
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllMessages();
    }, [chatAreaUserId])

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
                        isSentMessage={msg.reciever._id || msg.reciever === chatAreaUserId ? true : false}
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