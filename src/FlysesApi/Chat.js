import { apiDelete, apiFormDataPost, apiGet, apiPut } from "./FlysesApi";

export const getChatDetail = (userId,isRead) => {
    return apiGet(`chat/GetChatDetailsForAdmin/${userId}/${isRead}`);
};

export const getUserList = () => {
    return apiGet(`chat/GetAllChatUsers`);
};

export const sendChat = (obj) => {
    return apiFormDataPost("chat", obj);
};

export const chatDeleteApi = (id,userId) => {
    return apiDelete(`chat/${id}/${userId}`);
};

export const chatReadApi = (userId) => {
    return apiPut(`chat/${userId}`);
};

export const getUserOnlineStatusValue = () => {
    return apiGet(`user/getUserOnlineStatus`);
};