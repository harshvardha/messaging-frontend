import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { disconnectSocket } from "../../sockets/SocketConnection";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import blankProfile from "../../images/blank-profile-picture.png";
import "./ProfileHeader.css";

const ProfileHeader = () => {
    const navigateTo = useNavigate();
    const { profilePicUrl } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("access_token");
        disconnectSocket(localStorage.getItem("user_id"));
        localStorage.removeItem("user_id");
        navigateTo("/");
    }

    return (
        <div className="profileHeader">
            <Link to={"/profile"}>{profilePicUrl ?
                <img id="blankProfile" src={profilePicUrl} alt="" /> :
                <img id="blankProfile" src={blankProfile} alt="" />}
            </Link>
            <div className="profileHeader--actions">
                <MdGroups className="profileHeader--icons" />
                <RiLogoutCircleLine className="profileHeader--icons" onClick={logout} />
            </div>
        </div>
    )
}

export default ProfileHeader;