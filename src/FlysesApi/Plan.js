import { apiGet } from "./FlysesApi";

export const getPlan = (id) => {
    return apiGet(`PricePlan/CategoryWisePlan/${id}`);
};

export const getCategoryWiseServiceDetails = (id) => {
    return apiGet(`PricePlan/getCategoryWiseServiceDetails/${id}`);
};

export const getProductPlan = (id) => {
    return apiGet(`PricePlan/CategoryWisePlanForProduct/${id}`);
};

export const getProductReview = (id) => {
    return apiGet(`review/GetCategoryReview/${id}`);
};

export const getProductWiseFaq = (id) => {
    return apiGet(`faq/GetCategoryWiseFAQ/${id}`);
};

export const getProductWiseReview = (id) => {
    return apiGet(`review/GetCategoryWiseReview/${id}`);
};