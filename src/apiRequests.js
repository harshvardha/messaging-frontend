import axios from "axios";

const api = axios.create();
const baseUrl = "http://127.0.0.1:5000";

// api calls for authentication
export const authenticationApiRequests = {
    register: (registrationDetails) => api.post(`${baseUrl}/auth/register`, registrationDetails),
    login: (loginDetails) => api.post(`${baseUrl}/auth/login`, loginDetails)
}

// api calls for user account
export const userApiRequests = {
    editProfile: (newProfileDetails, accessToken) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/user/editProfile`, newProfileDetails);
    },
    editAccountCredentials: (newAccountCredentials, accessToken) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/user/editAccountCredentials`, newAccountCredentials);
    },
    getUserAccountInfo: (accessToken) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.get(`${baseUrl}/user/accountInfo`);
    }
}

// api calls for one to one messaging
export const messageApiRequests = {
    createMessage: (accessToken, messageDetails) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.post(`${baseUrl}/message/createMessage`, messageDetails);
    },
    deleteMessage: (accessToken, messageId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.delete(`${baseUrl}/message/deleteMessage/${messageId}`);
    },
    getMessages: (accessToken, recieverId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.get(`${baseUrl}/message/messages`, recieverId);
    }
}

// api calls for groups
export const groupApirequests = {
    createGroup: (accessToken, groupName) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.post(`${baseUrl}/group/createGroup`, groupName);
    },
    addParticipant: (accessToken, groupId, participantId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/group/addPaticipant`, { groupId, participantId });
    },
    exitGroup: (accessToken, groupId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.post(`${baseUrl}/group/exitGroup/${groupId}`)
    },
    kickParticipant: (accessToken, groupId, participantId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/group/kickParticipant`, { groupId, participantId });
    },
    kickAdmin: (accessToken, groupId, adminId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/group/kickAdmin`, { groupId, adminId });
    },
    editGroupName: (accessToken, groupId, groupName) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/group/editGroupName/${groupId}`, { groupName });
    },
    editProfilePic: (accessToken, groupId, profilePicUrl) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/group/editProfilePic/${groupId}`, { profilePicUrl });
    },
    addAdmin: (accessToken, groupId, participantId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.put(`${baseUrl}/group/addAdmin`, { groupId, participantId });
    }
}

// api calls for group message
export const groupMessageApiRequests = {
    createGroupMessage: (accessToken, groupId, messageDescription) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.post(`${baseUrl}/groupMessage/createMesage/${groupId}`, { description: messageDescription });
    },
    deleteMessage: (accessToken, groupId, groupMessageId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.delete(`${baseUrl}/groupMessage/deleteMessage/${groupId}/${groupMessageId}`);
    },
    getGroupMessages: (accessToken, groupId) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return api.get(`${baseUrl}/groupMessages/allMessages?query=${groupId}`);
    }
}