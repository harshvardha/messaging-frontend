import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ChatUser from "../../components/ChatUser/ChatUser";
import ChatArea from "../../components/ChatArea/ChatArea";
import { userApiRequests } from "../../apiRequests";
import { timeAgo } from "../../utils/timeAgo";
import "./Messaging.css";
import { socket, isSocketConnected, connectSocket } from "../../sockets/SocketConnection";

const Messaging = () => {
    const [searchQuery, setSearchQuery] = useState();
    const [isChatAreaOpen, setIsChatAreaOpen] = useState(false);
    const [usersSearched, setUsersSearched] = useState(null);
    const [userConnections, setUserConnections] = useState([]);
    const [chatAreaUserId, setChatAreaUserId] = useState();
    const [chatAreaUserProfilePicUrl, setChatAreaUserProfilePicUrl] = useState();
    const [chatAreaUsername, setChatAreaUsername] = useState();
    const { setProfilePicUrl } = useContext(UserContext);

    useEffect(() => {
        const searchUser = async () => {
            if (searchQuery) {
                // first we will search in existing user connections
                const filteredUsers = userConnections.map(connection => {
                    if (connection.username?.startsWith(searchQuery)) {
                        return <ChatUser
                            userId={connection.userId}
                            profilePicUrl={connection.profilePicUrl}
                            username={connection.username}
                            recentMessage={connection.description}
                            undeliveredMessagesCount={connection.undeliveredMessagesCount}
                            delivered={connection.delivered}
                            seen={connection.seen}
                            setIsChatAreaOpen={setIsChatAreaOpen}
                            setChatAreaUserId={setChatAreaUserId}
                            setChatAreaUserProfilePicUrl={setChatAreaUserProfilePicUrl}
                            setChatAreaUsername={setChatAreaUsername}
                            dateOrDay={timeAgo(connection.createdAt)}
                        />
                    }
                });

                // if not found in existing user connections then send query to server
                if (filteredUsers.length === 0 || (filteredUsers.length === 1 && filteredUsers[0] === undefined)) {
                    const accessToken = localStorage.getItem("access_token");
                    const response = await userApiRequests.searchUser(accessToken, searchQuery);
                    if (response.status === 200) {
                        setUsersSearched(response.data.map(connection =>
                            <ChatUser
                                userId={connection._id}
                                profilePicUrl={connection.profilePicUrl || ""}
                                username={connection.username}
                                recentMessage={connection.description || ""}
                                setIsChatAreaOpen={setIsChatAreaOpen}
                                setChatAreaUserId={setChatAreaUserId}
                                setChatAreaUserProfilePicUrl={setChatAreaUserProfilePicUrl}
                                setChatAreaUsername={setChatAreaUsername}
                                dateOrDay={""}
                            />
                        ))
                    } else if (response.status === 404) {
                        window.alert("User not found.");
                    }
                }
                else {
                    setUsersSearched(filteredUsers);
                }
            } else {
                setUsersSearched(null)
            }
        }
        searchUser();
    }, [searchQuery])

    const handleNewMessage = async (data) => {
        try {
            setUserConnections(prev => {
                const connectionIndex = prev.findIndex(connection => connection.userId === data.sender._id);
                if (connectionIndex === -1) {
                    // when connection does not exist in you connection list
                    const newConnection = {
                        userId: data.sender._id,
                        profilePicUrl: data.sender.profilePicUrl,
                        username: data.sender.username,
                        description: data.description,
                        seen: data.seen,
                        delivered: true,
                        createdAt: data.createdAt,
                        undeliveredMessagesCount: 1
                    }
                    return [newConnection, ...prev];
                }
                else {
                    // when connection exist in our connection list
                    const temp = prev[connectionIndex];
                    temp.description = data.description;
                    temp.delivered = true;
                    temp.createdAt = data.createdAt;
                    console.log(`undelivered messages count: ${typeof temp.undeliveredMessagesCount} ${temp.undeliveredMessagesCount}`)
                    temp.undeliveredMessagesCount += 1;
                    const filteredConnections = prev.filter(connection => connection.userId !== data.sender._id);
                    return [temp, ...filteredConnections];
                }
            });
            socket.emit("recieved_message", { _id: data._id, senderId: data.sender._id, delivered: true });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(`socket connection status: ${isSocketConnected}`);
        if (isSocketConnected) {
            socket.on("new_message", (data) => handleNewMessage(data));
        }
        else {
            connectSocket(localStorage.getItem("user_id"));
        }

        return () => {
            socket.off("new_message");
        }
    }, [isSocketConnected])

    useEffect(() => {
        const getUserAccountInfo = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await userApiRequests.getUserAccountInfo(accessToken);
                if (response.status === 200) {
                    setProfilePicUrl(response.data.profilePicUrl);
                }
            } catch (error) {
                console.log(error);
            }
        }

        const getUserConnections = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await userApiRequests.getUserConnections(accessToken);
                if (response.status === 200) {
                    setUserConnections(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserAccountInfo();
        getUserConnections();
    }, []);

    return (
        <div className="messaging">
            <div className="messaging--chatUsers">
                <ProfileHeader />
                <div className="chatUsers--search">
                    <input
                        id="chatUsers--searchConversations"
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search or start a new chat"
                    />
                </div>
                <div className="chatUsers--conversations">
                    {usersSearched ?
                        usersSearched :
                        userConnections?.map(connection =>
                            <ChatUser
                                userId={connection.userId}
                                profilePicUrl={connection.profilePicUrl}
                                username={connection.username}
                                recentMessage={connection.description}
                                setIsChatAreaOpen={setIsChatAreaOpen}
                                setChatAreaUserId={setChatAreaUserId}
                                setChatAreaUserProfilePicUrl={setChatAreaUserProfilePicUrl}
                                setChatAreaUsername={setChatAreaUsername}
                                setSearchQuery={setSearchQuery}
                                dateOrDay={timeAgo(connection.createdAt)}
                            />
                        )
                    }
                </div>
            </div>
            {
                isChatAreaOpen ? (
                    <ChatArea
                        chatAreaUserProfilePicUrl={chatAreaUserProfilePicUrl}
                        chatAreaUsername={chatAreaUsername}
                        chatAreaUserId={chatAreaUserId}
                        userConnections={userConnections}
                        setUserConnections={setUserConnections}
                    />
                ) : (
                    <div className="messaging--chatArea" />
                )
            }

        </div>
    )
}

export default Messaging;