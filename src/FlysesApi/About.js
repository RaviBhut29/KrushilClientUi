import { apiGet } from "./FlysesApi";

export const getAboutApi = (id) => {
    return apiGet(`about`);
};