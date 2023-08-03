import { apiGet } from "./FlysesApi";

export const getOrder = (id) => {
    return apiGet(`order/getUserOrder/${id}`);
};