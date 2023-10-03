import { apiFormDataPost, apiGet, apiPost } from "./FlysesApi";

export const getRequirementList = (id) => {
    return apiGet(`Requirement/GetRequirement/${id}`);
};

export const getRequirement = (userId,categoryId,urOrderId) => {
    return apiGet(`Requirement/GetAdminReadRequirement/${userId}/${categoryId}/${urOrderId}`);
};

export const submitFormDetail = (obj) => {
    return apiFormDataPost(`Requirement/UserWiseRequirement`,obj);
};

export const submitFormFileDetail = (obj) => {
    console.warn("submitFileInput",obj)
    return apiFormDataPost(`Requirement/UserWiseRequirementFile`,obj);
};
