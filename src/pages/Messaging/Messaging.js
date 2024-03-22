import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ChatUser from "../../components/ChatUser/ChatUser";
import "./Messaging.css";

const Messaging = () => {
    const [searchQuery, setSearchQuery] = useState();

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
                    <ChatUser />
                </div>
            </div>
            <div className="messaging--chatArea">

            </div>
        </div>
    )
}

export default Messaging;