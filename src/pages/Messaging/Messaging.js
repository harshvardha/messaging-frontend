import { useState } from "react";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ChatUser from "../../components/ChatUser/ChatUser";
import Message from "../../components/Message/Message";
import blankProfileImage from "../../images/blank-profile-picture.png";
import { IoSend } from "react-icons/io5"
import "./Messaging.css";

const Messaging = () => {
    const [searchQuery, setSearchQuery] = useState();
    const [isChatAreaOpen, setIsChatAreaOpen] = useState(false);
    const [message, setMessage] = useState();
    const [isSentMessage, setIsSentMessage] = useState(false);
    const [isGroupMessage, setIsGroupMessage] = useState(false);

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
                    <ChatUser setIsChatAreaOpen={setIsChatAreaOpen} />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                </div>
            </div>
            {
                isChatAreaOpen ? (
                    <div className="messaging--chatArea--open">
                        <div className="chatArea--header">
                            <img id="blankProfile" src={blankProfileImage} alt="" />
                            <p>Harshvardhan Singh</p>
                        </div>
                        <div className="chatArea--chats">
                            <Message isSentMessage={false} isGroupMessage={false} />
                            <Message isSentMessage={true} isGroupMessage={false} />
                            <Message isSentMessage={false} isGroupMessage={false} />
                            <Message isSentMessage={true} isGroupMessage={false} />
                            <Message isSentMessage={false} isGroupMessage={true} />
                            <Message isSentMessage={true} isGroupMessage={true} />
                        </div>
                        <div className="chatArea--footer">
                            <input
                                id="chatArea--typeMessage"
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Type a message"
                            />
                            {message && <IoSend id="chatArea--sentMessage" />}
                        </div>
                    </div>
                ) : (
                    <div className="messaging--chatArea" />
                )
            }

        </div>
    )
}

export default Messaging;