import { apiGet } from "./FlysesApi";

export const getCategory = (id) => {
    return apiGet(`category/ServiceWiseCategory/${id}`);
};

export const getCategoryIcon = (id) => {
    return apiGet(`service/getServiceFile/${id}`);
};