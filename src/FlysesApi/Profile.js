import { apiGet } from "./FlysesApi";

export const getuserdetails = (id) => {
    return apiGet(`user/getById/${id}`);
};