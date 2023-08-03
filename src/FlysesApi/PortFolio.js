import { apiGet } from "./FlysesApi";

export const getServiceWisePortfolios = (id,pageNo) => {
    return apiGet(`portfolio/getServiceWisePortfolio/${id}/${pageNo}`);
};

export const getbyIdPortfolio = (id) => {
    return apiGet(`portfolio/${id}`);
};