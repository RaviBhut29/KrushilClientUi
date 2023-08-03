import { apiGet } from "./FlysesApi";

export const getPlanWiseOrderOptionDetails = (id) => {
    return apiGet(`OrderOption/GetPlanWiseOrderOption/${id}`);
};