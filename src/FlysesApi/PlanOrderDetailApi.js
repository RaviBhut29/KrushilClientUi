import { apiGet, apiPost, apiPut } from "./FlysesApi";

export const getPlanWiseOrderOptionDetails = (id) => {
    return apiGet(`OrderOption/GetPlanWiseOrderOption/${id}`);
};

export const getOrderFeature = (userId,orderId) => {
    return apiGet(`userWiseOrderOption/${userId}/${orderId}`);
};

export const getOrderDelivery = (orderId) => {
    return apiGet(`orderdelivery/${orderId}`);
};

export const updateOrderStatus = (id,status) => {
    return apiPut(`order/${id}/${status}`);
};

export const submitReview = (obj) => {
    return apiPost(`review`,obj);
};

export const ReviewAlreadyExists = (id) => {
    return apiGet(`review/checkAlreadReviewExists/${id}`);
};