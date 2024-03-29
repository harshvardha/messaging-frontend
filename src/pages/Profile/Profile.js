import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { userApiRequests } from "../../apiRequests";
import usePreviewImage from "../../hooks/usePreviewImage";
import useUploadImage from "../../hooks/useUploadImage";
import blankProfileImage from "../../images/blank-profile-picture.png";
import "./Profile.css";

const Profile = () => {
    const [username, setUsername] = useState();
    const { profilePicUrl, setProfilePicUrl } = useContext(UserContext);
    const { imageFile, setImageFile, handleImageChange } = usePreviewImage();
    const { setFile, downloadUrl, uploadPercentage, isUploading, uploadImage, setUploadPercentage } = useUploadImage();
    const navigateTo = useNavigate();

    const updateProfile = async () => {
        try {
            const newProfileDetails = {};
            if (!username) {
                return window.alert("Please provide username.");
            }
            if (downloadUrl || profilePicUrl) {
                newProfileDetails["profilePicUrl"] = downloadUrl || profilePicUrl;
            }
            newProfileDetails["username"] = username;
            const accessToken = localStorage.getItem("access_token");
            const response = await userApiRequests.editProfile(newProfileDetails, accessToken);
            if (response.status === 200) {
                setProfilePicUrl(response.data.profilePicUrl);
                navigateTo("/messaging");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isUploading === false && uploadPercentage === 100) {
            console.log("updating profile");
            updateProfile();
            setUploadPercentage(0);
        }
    }, [isUploading]);

    useEffect(() => {
        const getUserAccountInformation = async () => {
            const accessToken = localStorage.getItem("access_token");
            const response = await userApiRequests.getUserAccountInfo(accessToken);
            if (response.status === 200) {
                const data = response.data;
                setUsername(data.username);
                if (!profilePicUrl)
                    setProfilePicUrl(data.profilePicUrl);
                setImageFile(profilePicUrl);
            }
        }
        getUserAccountInformation();
    }, []);

    return (
        <div className="profile">
            <div className="profile--form">
                <div className="profile--formElement">
                    <label className="formElement--label">Username</label>
                    <input
                        className="formElement--entry"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter new username"
                    />
                </div>
                <div className="profile--formElement">
                    <label className="formElement--label">Profile Pic</label>
                    <div className="profilePic">
                        {imageFile ? <img id="newProfilePic" src={imageFile} /> : <img id="newProfilePic" src={blankProfileImage} />}
                        <label id="changePhoto">
                            <input
                                type="file"
                                accept="image/"
                                onChange={(event) => {
                                    setFile(event.target.files[0]);
                                    setImageFile(null);
                                    handleImageChange(event);
                                }}
                                hidden
                            />
                            Change photo
                        </label>
                    </div>
                </div>
                <button type="button" id="updateProfileButton" onClick={() => {
                    if (imageFile === profilePicUrl) {
                        updateProfile();
                    } else if (username) {
                        uploadImage();
                    }
                }}>Update</button>
            </div>
        </div>
    )
}

export default Profile;