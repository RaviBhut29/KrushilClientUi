import { apiGet } from "./FlysesApi";

export const getPlan = (id) => {
    return apiGet(`PricePlan/CategoryWisePlan/${id}`);
};

export const getProductPlan = (id) => {
    return apiGet(`PricePlan/CategoryWisePlanForProduct/${id}`);
};