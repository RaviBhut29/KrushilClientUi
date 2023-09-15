import { apiFormDataPost, apiGet, apiPost } from "./FlysesApi";

export const getRequirementList = (id) => {
    return apiGet(`Requirement/GetRequirement/${id}`);
};

export const submitFormDetail = (obj) => {
    return apiFormDataPost(`Requirement/UserWiseRequirement`,obj);
};
