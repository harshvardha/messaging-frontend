import { RiLogoutCircleLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import blankProfile from "../../images/blank-profile-picture.png";
import "./ProfileHeader.css";

const ProfileHeader = () => {
    return (
        <div className="profileHeader">
            <img id="blankProfile" src={blankProfile} alt="" />
            <div className="profileHeader--actions">
                <MdGroups className="profileHeader--icons" />
                <RiLogoutCircleLine className="profileHeader--icons" />
            </div>
        </div>
    )
}

export default ProfileHeader;