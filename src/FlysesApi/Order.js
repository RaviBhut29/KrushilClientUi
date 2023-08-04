import { apiGet, apiPost } from "./FlysesApi";

export const getOrder = (obj) => {
    return apiPost(`order/getUserOrder`,obj);
};